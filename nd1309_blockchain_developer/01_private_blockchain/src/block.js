/** Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {
	constructor(data){
		this.hash = null;                                           
		this.height = 0;                                            
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');
		this.time = 0;
		this.previousBlockHash = null;
    }
    
    validate() {
        let self = this;

        return new Promise((resolve, reject) => {
            let auxiliaryHash = self.hash;
            self.hash = null;
            let newHash = SHA256(JSON.stringify(self)).toString();
            self.hash = auxiliaryHash;

            if (auxiliaryHash === newHash) {
                resolve(true);
              } else {
                resolve(false);
              }
        });
    }

    getBData() {
        let decodedBody = JSON.parse(hex2ascii(this.body));
        if (decodedBody && this.height > 0) {
            return decodedBody;
        }
    }
}

module.exports.Block = Block;                    // Exposing the Block class as a module
