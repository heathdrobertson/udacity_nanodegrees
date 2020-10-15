const ToiletHillERC721Token = artifacts.require('ToiletHillERC721Token');
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('TestToiletHillERC721Token', accounts => {
    let toiletHillERC721Token;
    // console.log(accounts);
    const acctOne = accounts[0];
    const acctTwo = accounts[1];
    const acctThree = accounts[2];
    const acctFour = accounts[3];
    const acctFive = accounts[4];

    describe('match erc721 spec', () =>  {

        beforeEach(async () => {
            toiletHillERC721Token = await ToiletHillERC721Token.new({from: acctOne});

            // TODO: mint multiple tokens
            await toiletHillERC721Token.mint( acctTwo, 1, {from: acctOne} );
            await toiletHillERC721Token.mint( acctThree, 2, {from: acctOne} );
            await toiletHillERC721Token.mint( acctThree, 3, {from: acctOne} );
            await toiletHillERC721Token.mint( acctFour, 4, {from: acctOne} );
            await toiletHillERC721Token.mint( acctFive, 5, {from: acctOne} );
            await toiletHillERC721Token.mint( acctFive, 6, {from: acctOne} );
            await toiletHillERC721Token.mint( acctFive, 7, {from: acctOne} );
        })

        it('should return total supply', async () => {
            const totalSupply = await toiletHillERC721Token.totalSupply();
            //console.log(totalSupply);
            assert.equal(totalSupply.toNumber(), 7, "Nope, not the correct supply.");
        })

        it('should get token balance', async () =>  {
            const balance = await toiletHillERC721Token.balanceOf(acctFive);
            //console.log(balance);
            assert.equal(balance.toNumber(), 3, "Not the correct balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async () => {
            const URI = await toiletHillERC721Token.tokenURI(1);
            //console.log(URI);
            assert.equal(
                URI,
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1",
                "Not the correct balance"
            );
        })

        it('should transfer token from one owner to another', async () => {
            const _tokenId = 7;
            const _owner = await toiletHillERC721Token.ownerOf(_tokenId);
            assert.equal(_owner, acctFive, "Wrong initial owner of token");

            await toiletHillERC721Token.transferFrom(acctFive, acctFour, _tokenId, {from: acctFive});

            const _newOwner = await toiletHillERC721Token.ownerOf(_tokenId);
            assert.equal(_newOwner, acctFour, "Wrong new owner of token");
        })
    });

    describe('have ownership properties', () => {
        beforeEach(async () => {
            toiletHillERC721Token = await ToiletHillERC721Token.new({from: acctOne});
        })

        it('should fail when minting when address is not contract owner', async () => {
            await truffleAssert.reverts(
                toiletHillERC721Token.mint(
                    acctTwo,
                    8,
                    {from: acctTwo}
                )
            );
        });

        it('should return contract owner', async () => {
            const _owner = await toiletHillERC721Token.getOwner();
            assert.equal(_owner, acctOne, "Incorrect owner returned.")
        })

    });
})
