// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
const SquareVerifier = artifacts.require('SquareVerifier');
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

const Proof = require("../../zokrates/code/square/proof_3_true.json");
const FalseProof = require("../../zokrates/code/square/proof_3_false.json");

contract('TestSquareVerifier', async ( accounts ) => {
    let squareVerifier;
    const acctOne = accounts[0];
    const acctTwo = accounts[1];

    describe('use the contents from proof.json generated from zokrates steps', () => {
        beforeEach(async () => {
            squareVerifier = await SquareVerifier.new(acctOne);
        })
        // ~/zokrates compute-witness -a 3 9
        // 3 * 3 = 9 (true)
        it('test verification with correct proof.json', async () => {
            let isValid = await squareVerifier.verifyTx.call(
                a=Proof.proof.a,
                b=Proof.proof.b,
                c=Proof.proof.c, 
                input=Proof.inputs
                );
            assert.equal(isValid, true, "Returned False");
        })
        // ~/zokrates compute-witness -a 3 12
        // 3 * 3 != 12 (false)
        it('test verification with false-proof.json', async () => {
            let isValid = await squareVerifier.verifyTx.call(
                a=FalseProof.proof.a,
                b=FalseProof.proof.b,
                c=FalseProof.proof.c, 
                input=FalseProof.inputs
                );
            assert.equal(isValid, false, "Returned True");
        })
    });

})