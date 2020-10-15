pragma solidity ^0.5.0;

// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/\
// november/smart-contract-insecurity-bad-arithmetic/

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@Openzeppelin/contracts/access/Ownable.sol";

/* FlightSurety Smart Contract *********************************************************/

contract SampleContract {  

    using SafeMath for uint256;

    /* DATA VARIABLES ******************************************************************/

   string public data;

    struct Data {
        uint8 status;
        uint256 timestamp;
        address owner;
        string  name;
    }

    mapping(bytes32 => Data) private data;


    /* EVENT DEFINITIONS ***************************************************************/
    event DataSaved(string data, string _message);


    /* FUNCTION MODIFIERS **************************************************************/
    modifier requireOwner() {
        require(msg.sender == Owner, "Caller is not owner");
        _;
    }

    /* CONSTRUCTOR *********************************************************************/

    constructor(address payable dataContractAddress) public
    {
        contractOwner = msg.sender;
        dataContractAddress = dataContractAddress;
        data = "Seed Data";
    }


    /* UTILITY FUNCTIONS ***************************************************************/
    function getData() view external returns(string memory) {
        return data;
    }
    function setData(string calldata _data) external {
        data = _data;
        emit DataSaved(_data, "Data has been saved");
    }

    /* SMART CONTRACT FUNCTIONS ********************************************************/
    function normalThing() public {
        // anyone can call this normalThing()
    }

    function specialThing() public onlyOwner {
        // only the owner can call specialThing()!
    }
}   


/** DATA CONTRACT INTERFACE ************************************************************/

contract DataContract{

    function getThingState(address thing) external returns(uint);

    function createThing(address thingAddress, uint8 state, string  calldata name) 
    external;

    function getPassengerBalance(address passenger) external pure returns (uint256);

    function payPassenger(address passenger) external;

}
