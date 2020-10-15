pragma solidity ^0.5.1;

import { ToiletHillERC721Token } from "./ERC721Mintable.sol";

// TODO⚡ define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ToiletHillERC721Token {

    /* VARIABLES ***********************************************************************/

    // TODO⚡ define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    SquareVerifier squareVerifier;

    // TODO⚡ define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 tokenId;
        address to;
    }
    // TODO⚡ define an array of the above struct
    Solution[] solutionsArray;
    // TODO⚡ define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutionsSubmitted;

    /* EVENTS **************************************************************************/
    // TODO⚡ Create an event to emit when a solution is added
    event SolutionsAdded(uint256 indexed tokenId, address indexed to, bytes32 indexed key);

    /* CONSTRUCTOR *********************************************************************/

    constructor(address verifierAddress) public {

        squareVerifier = SquareVerifier(verifierAddress);

    }

    /* FUNCTIONS ***********************************************************************/
    // TODO⚡ Create a function to add the solutions to the array and emit the event
    function _addSolutionsToArray( address _to, uint256 _tokenId, bytes32 _key) internal {
        Solution memory _solution = Solution(_tokenId, _to);
        solutionsArray.push(_solution);
        solutionsSubmitted[_key] = _solution;
        emit SolutionsAdded(_tokenId, _to, _key);
    }

    function addSolutionsToArray(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(solutionsSubmitted[key].to == address(0), "Solution is already used");
        require(squareVerifier.verifyTx(a, b, c, input), "Solution is incorrect");
        _addSolutionsToArray(to, tokenId, key);
    }

    // TODO⚡ Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function tokenMinter(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public whenNotPaused {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(solutionsSubmitted[key].to == address(0), "Solution is already used");
        require(squareVerifier.verifyTx(a, b, c, input), "Solution is incorrect");
        _addSolutionsToArray(to, tokenId, key);
        super.mint(to, tokenId);
    }
}

/** VERIFIY CONTRACT INTERFACE ************************************************************/
interface SquareVerifier {
    function verifyTx(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[2] calldata input
    )
    external
    returns (bool r);
}
