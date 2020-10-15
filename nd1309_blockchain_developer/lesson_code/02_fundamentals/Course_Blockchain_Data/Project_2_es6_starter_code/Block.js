/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

const SHA256 = require('crypto-js/sha256')

class Block {
	constructor(data){
		// Add your Block properties
		// Example: this.hash = "";
        this.height = 0;
        this.timestamp = '';
        this.data = data;
        this.previousHash = '0x';
        this.hash = '';
	}
}

/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/

class Blockchain{
    constructor(){
        this.chain = [];
        this.addBlock(this.createGenesisBlock());
    }

    createGenesisBlock(){
        return new Block("first block in the chain = Genesis Block");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    
    addBlock(newBlock){
        newBlock.height = this.chain.length;
        newBlock.timestamp = new Date().getTime().toString().slice(0, -3);

        if(this.chain.length>0){
            newBlock.previousHash = this.chain[this.chain.length-1].hash;
        }
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        console.log(JSON.stringify(newBlock));
        this.chain.push(newBlock);
    };
}

module.exports.Block = Block;

function run(){
    let blockNew1 = new Block(["Some data", "More data"]);
    let blockNew2 = new Block(["Next block data", "more next data"]);

    let newChain = new Blockchain();
    newChain.addBlock(blockNew1);
    newChain.addBlock(blockNew2);
    console.log(newChain.chain);
}


if(require.main == module)
    run();

