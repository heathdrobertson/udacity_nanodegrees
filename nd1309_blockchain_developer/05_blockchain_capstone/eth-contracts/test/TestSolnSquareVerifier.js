const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');
const Config = require('../config/config.json');

const Proof = require("../../zokrates/code/square/proof.json");
const Proof3 = require("../../zokrates/code/square/proof_3_true.json");

contract('TestSolnSquareVerifier', accounts => {
    let solutionSquareVerifier;
    const acctBase = '0x0000000000000000000000000000000000000000'; 
    const contractAddress = Config.verifierAddress;;
    const acctOne = accounts[0];
    const acctTwo = accounts[1];
    const _tokenId = 1;

    describe('testing combine contracts SolnSquareVerifier', () =>  {
        beforeEach(async () => {
            solutionSquareVerifier = await SolnSquareVerifier.new(contractAddress);
        })

        it('Test if a new solution can be added for contract - SolnSquareVerifier', async () => {
            const tx = await solutionSquareVerifier.tokenMinter(
                acctTwo,
                _tokenId,
                a=Proof.proof.a,
                b=Proof.proof.b,
                c=Proof.proof.c, 
                input=Proof.inputs
            );

            truffleAssert.eventEmitted(tx, 'SolutionsAdded', (event) => {
                assert.equal(event.to, acctTwo, 'Not the correct token owner');
                return event.to == acctTwo && event.tokenId == 1; 
            });
        });
        it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async () =>  {
            const tx = await solutionSquareVerifier.tokenMinter(
                acctTwo,
                _tokenId,
                a=Proof3.proof.a,
                b=Proof3.proof.b,
                c=Proof3.proof.c, 
                input=Proof3.inputs
            );

            truffleAssert.eventEmitted(tx, 'Transfer', (event) => {
                assert.equal(event.to, acctTwo, 'Not the correct token owner');
                return event.from == acctBase && event.to == acctTwo && event.tokenId == 1; 
            });
        });
    });
})
