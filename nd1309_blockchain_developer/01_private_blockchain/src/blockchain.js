/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *  
 */

const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');
const hex2ascii = require('hex2ascii');

// Data persistence 
const fs = require('fs')

class Blockchain {

    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    async initializeChain() {
        if( this.height === -1){
            let block = new BlockClass.Block({data: 'Genesis Block'});
            await this._addBlock(block);
        }
    }

    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    // Data persistence 
    _loadData() {
        let chainData = fs.readFileSync("./data.json");
        let data = JSON.parse(chainData);
        for (let i = 1; i < data.length; i++) {
            let block = new BlockClass.Block({});
            block.hash = data[i].hash;
            block.height = data[i].height;
            block.body = data[i].body;
            block.time = data[i].time;
            block.previousBlockHash = data[i].previousBlockHash;
            this.chain.push(block);
        }
        console.log('The data has been loaded.');
    }
    
    // Data persistence 
    _saveData() {
        let chainData = JSON.stringify(this.chain);
        fs.writeFile("./data.json", chainData, 'utf8', (err) => {
            if (err) throw err;
            console.log(chainData);
            console.log('The file has been saved!');
        }); 
    }

    _addBlock(block) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            block.height = this.chain.length;
            block.time = new Date().getTime().toString().slice(0,-3);
            block.hash = SHA256(JSON.stringify(block)).toString();
            if(this.height === -1){
                block.previousBlockHash = null;
                resolve(block);
                // console.log("inside if of _addBlock() method");
            }else{
                block.previousBlockHash = this.chain[this.chain.length-1].hash;
                resolve(block);
            }
            this.chain.push(block);
            this.height = this.chain.length;
        });
    }

    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            // let date = new Date().getTime().toString().slice(0, -3)
            // let message = address + ':' + date + ':starRegistry';
            // This is using tempalte literals [Tempalte strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
            let message = `${address}:${new Date().getTime().toString().slice(0,-3)}:starRegistry`;
            resolve(message);
        });
    }

    submitStar(address, message, signature, star) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            let messageTime = parseInt(message.split(':')[1]);
            let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
            let timeDif = currentTime - messageTime;
            
            // This needs nested if(verified == true) to return rejection explanation.
            // rejected("Submit within 5 minutes of message creation.)
            // rejected("varifiying signature failed")
            if (timeDif < (5*60000)) {
                let verified = bitcoinMessage.verify(message, address, signature); 
                if (verified) {
                    let block = new BlockClass.Block({owner: address, star: star});
                    await this._addBlock(block);
                    resolve(block);
                } else {
                    reject("Signature verification failed");
                }
            } else {
                reject("Star not submitted within the 5 minute timeframe.");
            }
        });
    }

    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
            // The find() function searches objects in the array this.chain for an object with object.hash equal to hash
            let block = this.chain.find(block => block.hash === hash);
            if(block){
                resolve(block)
            }else{
                resolve(null);
            }
        });
    }

    getBlockByHeight(height) {
        let self = this;
        return new Promise(async (resolve, reject) => {
            let block = self.chain.filter(p => p.height === height)[0];

            // Data persistence
            // Not gonna re-enter star data
            if (height == 100) {
                this._loadData();
                resolve("data loaded...");
            } else if ( height == 101) {
                this._saveData();
                resolve("data saved..");
            }

            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    getStarsByWalletAddress (address) {
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            for (let i = 1; i < self.chain.length; i++) {
                let bodyDecoded = this.chain[i].getBData();
                if (bodyDecoded.owner == address) {
                    stars.push(bodyDecoded);
                }
            }
            resolve(stars);
        });
    }

    validateChain() {
        let self = this;
        let errorLog = [];
        return new Promise(async (resolve, reject) => {
            for (let i = 1; i < this.chain.length; i++) {
                let block = this.chain[i];
                let validatedBlock = await block.validate();
                let lastBlockHash = null;
                if(this.chain != 0){
                    lastBlockHash = this.chain[i-1].hash;
                }
                if(validatedBlock != true)  {
                    errorLog.push(validatedBlock);
                }else if(block.previousBlockHash != lastBlockHash){
                    errorLog.push("Previouse hash missmatch, Block Height: " + block.height);
                }
            }
            resolve(errorLog);
        });
    }
}

module.exports.Blockchain = Blockchain;   
