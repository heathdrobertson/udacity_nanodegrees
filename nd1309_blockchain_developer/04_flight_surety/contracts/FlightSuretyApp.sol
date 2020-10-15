pragma solidity ^0.5.0;

// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/\
// november/smart-contract-insecurity-bad-arithmetic/

// import "@openzeppelin/contracts/lifecycle/Pausable.sol";
// import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/* FlightSurety Smart Contract *********************************************************/

contract FlightSuretyApp {  // is Ownable, Pausable

    using SafeMath for uint256;


    /* DATA VARIABLES ******************************************************************/

    FlightSuretyData flightSuretyData;

    address payable flightSuretyDataContractAddress;
    address private contractOwner;
    bool private operational = true;
    bytes32[] private flightsKeyList;
    uint8 private constant NO_AIRLINES_REQUIRED_FOR_CONSENSUS_VOTING = 4;
    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_ON_TIME = 10;
    uint8 private constant STATUS_CODE_LATE_AIRLINE = 20; // only code that results in payout
    uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 private constant STATUS_CODE_LATE_OTHER = 50;
    uint8 private nonce = 0;
    uint256 public constant REGISTRATION_FEE = 0.0001 ether;
    uint256 private constant MIN_RESPONSES = 3;
    string public data;

    struct Flight {
        uint8 statusCode;
        uint256 timestamp;
        address airline;
        string  flight;
    }

    struct Oracle { bool isRegistered;
        uint8[3] indexes;
    }

    struct ResponseInfo {
        address requester;                              
        bool isOpen;                                    
        mapping(uint8 => address[]) responses;          
    }

    mapping(address => Oracle) private oracles;
    mapping(bytes32 => Flight) private flights;
    mapping(bytes32 => ResponseInfo) private oracleResponses;


    /* EVENT DEFINITIONS ***************************************************************/

    event AirlineApplied(address airline);
    event AirlineRegistered(address airline);
    event AirlinePaid(address airline);
    event FlightStatusProcessed(address airline, string flight, uint8 statusCode);
    event PassengerInsuranceBought(address passenger, bytes32 flightKey);
    event FlightStatusInfo(
        address airline, string flight, uint256 timestamp, uint8 status
    );
    event OracleReport(address airline, string flight, uint256 timestamp, uint8 status);
    event OracleRequest(uint8 index, address airline, string flight, uint256 timestamp);
    event OracleIsRegistered(uint8[3] idx, string _message);
    event ContractOperatingStatus(bool status, string _message);
    event DataSaved(string data, string _message);


    /* FUNCTION MODIFIERS **************************************************************/

    modifier requireIsOperational() {
        require(operational, "Contract is currently not operational");
        _;
    }

    modifier requireContractOwner() {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    modifier onlyRegisteredAirlines() {
        require(flightSuretyData.getAirlineState(msg.sender) == 1, "Only registered allowed");
        _;
    }

    modifier onlyPaidAirlines() {
        require(flightSuretyData.getAirlineState(msg.sender) == 2, "Only paid airlines allowed");
        _;
    }


    /* CONSTRUCTOR *********************************************************************/

    constructor(address payable dataContractAddress) public
    {
        contractOwner = msg.sender;

        flightSuretyDataContractAddress = dataContractAddress;
        flightSuretyData = FlightSuretyData(flightSuretyDataContractAddress);
        data = "Seed Data";


        // Initial flights

        bytes32 flightKey1 = getFlightKey(contractOwner, "FLIGHT1", now);
        flights[flightKey1] = Flight(STATUS_CODE_UNKNOWN, now, contractOwner, "FLIGHT1");
        flightsKeyList.push(flightKey1);

        bytes32 flightKey2 = getFlightKey(contractOwner, "FLIGHT2", now + 1 days);
        flights[flightKey2] = Flight(STATUS_CODE_UNKNOWN, now + 1 days, contractOwner, "FLIGHT2");
        flightsKeyList.push(flightKey2);

        bytes32 flightKey3 = getFlightKey(contractOwner, "FLIGHT3", now + 2 days);
        flights[flightKey3] = Flight(STATUS_CODE_UNKNOWN, now + 2 days, contractOwner, "FLIGHT3");
        flightsKeyList.push(flightKey3);
    }


    /* UTILITY FUNCTIONS ***************************************************************/

    function isContractOwner() public view returns (bool) {
        return (msg.sender == contractOwner);
    }

    function isOperational() public view returns (bool) {
        return operational;
    }

    function setOperatingStatus (bool mode) external requireContractOwner {
        operational = mode;
        emit ContractOperatingStatus(operational, "Contract Status Updated");
    }

    function refreshAccount() public view returns (bool) {
        if (msg.sender == contractOwner) {
            return true;
        } else {
            return false;
        }
    }

    function getData() view external returns(string memory) {
        return data;
    }
    function setData(string calldata _data) external {
        data = _data;
        emit DataSaved(_data, "Data has been saved");
    }
    /* SMART CONTRACT FUNCTIONS ********************************************************/

    /* AIRLINES */

    function registerAirline(string calldata airlineName) external 
    {
        flightSuretyData.createAirline(msg.sender, 0, airlineName);
        emit AirlineApplied(msg.sender);
    }

    function approveAirlineRegistration(address airline) external onlyPaidAirlines 
    {
        require(flightSuretyData.getAirlineState(airline) == 0, "This airline hasn't applied for approval");

        bool approved = false;
        uint256 totalPaidAirlines = flightSuretyData.getTotalPaidAirlines();

        if (totalPaidAirlines < NO_AIRLINES_REQUIRED_FOR_CONSENSUS_VOTING) {
            approved = true;
        } else {
            uint8 approvalCount = flightSuretyData.approveAirlineRegistration(airline, msg.sender);
            uint256 approvalsRequired = totalPaidAirlines / 2;
            if (approvalCount >= approvalsRequired) approved = true;
        }

        if (approved) {
            flightSuretyData.updateAirlineState(airline, 1);
            emit AirlineRegistered(airline);
        }
    }

    function payAirlineDues() external payable onlyRegisteredAirlines 
    {
        require(msg.value == 10 ether, "Payment of 10 ether is required");

        flightSuretyDataContractAddress.transfer(msg.value);
        flightSuretyData.updateAirlineState(msg.sender, 2);

        emit AirlinePaid(msg.sender);
    }    

    /* PASSENGERS */

    uint public constant MAX_INSURANCE_AMOUNT = 1 ether;
    uint public constant INSURANCE_DIVIDER = 2;



    function purchaseInsurance(address airline, string calldata flight, uint256 timestamp)
    external payable
    {
        bytes32 flightKey = getFlightKey(airline, flight, timestamp);

        require(bytes(flights[flightKey].flight).length > 0, "Flight does not exist");

        require(msg.value <= MAX_INSURANCE_AMOUNT, "Passengers can buy a maximum of 1 ether for insurance");

        flightSuretyDataContractAddress.transfer(msg.value);

        uint256 payoutAmount = msg.value + ( msg.value / INSURANCE_DIVIDER);

        flightSuretyData.createInsurance(msg.sender, flight, msg.value, payoutAmount);

        emit PassengerInsuranceBought(msg.sender, flightKey);
    }

    function getInsurance(string calldata flight) external view 
    returns (uint256 amount, uint256 payoutAmount, uint256 state) 
    {
        return flightSuretyData.getInsurance(msg.sender, flight);
    }

    function claimInsurance(address airline, string calldata flight, uint256 timestamp) external 
    {
        bytes32 flightKey = getFlightKey(airline, flight, timestamp);
        require(flights[flightKey].statusCode == STATUS_CODE_LATE_AIRLINE, "Flight was not delayed");

        flightSuretyData.claimInsurance(msg.sender, flight);
    }

    function getBalance() external view returns (uint256 balance) 
    {
        balance = flightSuretyData.getPassengerBalance(msg.sender);
    }

    function withdrawBalance() external 
    {
        flightSuretyData.payPassenger(msg.sender);
    }


    /* FLIGHTS */

    function getFlightsCount() external view returns (uint256 count)
    {
        return flightsKeyList.length;
    }

    function getFlight(uint256 index) external view 
    returns (address airline, string memory flight, uint256 timestamp, uint8 statusCode)
    {
        airline = flights[ flightsKeyList[index] ].airline;
        flight = flights[ flightsKeyList[index] ].flight;
        timestamp = flights[ flightsKeyList[index] ].timestamp;
        statusCode = flights[ flightsKeyList[index] ].statusCode;
    }

    function registerFlight(uint8 status, string calldata flight)
    external onlyPaidAirlines
    {
        bytes32 flightKey = getFlightKey(msg.sender, flight, now);

        flights[flightKey] = Flight(status, now, msg.sender, flight);
        flightsKeyList.push(flightKey);
    }

    function processFlightStatus(
        address airline, string memory flight, uint256 timestamp, uint8 statusCode
    )
    private
    {
        bytes32 flightKey = getFlightKey(airline, flight, timestamp);
        flights[flightKey].statusCode = statusCode;

        emit FlightStatusProcessed(airline, flight, statusCode);
    }

    function fetchFlightStatus(address airline, string calldata flight, uint256 timestamp)
    external
    {
        uint8 index = getRandomIndex(msg.sender);

        bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));

        oracleResponses[key] = ResponseInfo({
            requester : msg.sender,
            isOpen : true
            });

        emit OracleRequest(index, airline, flight, timestamp);
    }


    /** ORACLES */

    // Account that requested status
    // If open, oracle responses are accepted
    // Mapping key is the status code reported
    // Key = hash(index, flight, timestamp)

    function registerOracle() external payable
    {
        require(msg.value >= REGISTRATION_FEE, "Registration fee is required");
        
        uint8[3] memory indexes = generateIndexes(msg.sender); 

        oracles[msg.sender] = Oracle({ isRegistered : true, indexes : indexes });

        emit OracleIsRegistered(indexes, "Oracle has been registered.");
    }

    function getMyIndexes() view external returns (uint8[3] memory)
    {
        require(oracles[msg.sender].isRegistered, "Not registered as an oracle");

        return oracles[msg.sender].indexes;
    }

    function submitOracleResponse (
        uint8 index, address airline, string calldata flight, uint256 timestamp, uint8 statusCode
    ) external
    {
        require(
            (oracles[msg.sender].indexes[0] == index) ||
            (oracles[msg.sender].indexes[1] == index) ||
            (oracles[msg.sender].indexes[2] == index),
                "Index does not match oracle request"
        );

        bytes32 key = keccak256(abi.encodePacked(index, airline, flight, timestamp));
        require(
            oracleResponses[key].isOpen, 
            "Flight or timestamp do not match oracle request"
        );

        oracleResponses[key].responses[statusCode].push(msg.sender);

        emit OracleReport(airline, flight, timestamp, statusCode);

        if (oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES) {

            emit FlightStatusInfo(airline, flight, timestamp, statusCode);

            processFlightStatus(airline, flight, timestamp, statusCode);
        }
    }

    function getFlightKey(address airline, string memory flight, uint256 timestamp)
    pure internal returns (bytes32)
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    function generateIndexes(address account) internal returns (uint8[3] memory)
    {
        uint8[3] memory indexes;
        indexes[0] = getRandomIndex(account);

        indexes[1] = indexes[0];
        while (indexes[1] == indexes[0]) {
            indexes[1] = getRandomIndex(account);
        }

        indexes[2] = indexes[1];
        while ((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
            indexes[2] = getRandomIndex(account);
        }

        return indexes;
    }

    function getRandomIndex(address account) internal returns (uint8)
    {
        uint8 maxValue = 10;

        uint8 random = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - nonce++), account
                    )
                )
            ) % maxValue
        );

        if (nonce > 250) {
            nonce = 0;
        }

        return random;
    }

}   


/** DATA CONTRACT INTERFACE ************************************************************/

contract FlightSuretyData {

    function getAirlineState(address airline) external returns(uint);

    function createAirline(address airlineAddress, uint8 state, string  calldata name) 
    external;

    function updateAirlineState(address airlineAddress, uint8 state) external;

    function getTotalPaidAirlines() external returns (uint);

    function approveAirlineRegistration(address airline, address approver) external 
    returns (uint8);

    function createInsurance(
        address passenger, string  calldata flight, uint256 amount, uint256 payoutAmount
    ) external;

    function getInsurance(address passenger, string  calldata flight) external view
    returns (uint256 amount, uint256 payoutAmount, uint256 state);

    function claimInsurance(address passenger, string  calldata flight) external;

    function getPassengerBalance(address passenger) external pure returns (uint256);

    function payPassenger(address passenger) external;

}
