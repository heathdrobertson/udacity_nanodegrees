/*Ethereum Blockchain basics
 * Using Infura API Endpoints to interact with the Ethereum networks via Web3 
 * Javascript Package.
 */

const Web3 = require('web3');
const request = require('request');
const EthereumTx = require('ethereumjs-tx').Transaction;
const abiData = require('./abi.json');


class MonkeyAround{

    constructor(network, address, sendingAddress, receivingAddress, privateKeySender) {
        this.network = network;
        this.address = address;
        this.sendingAddress = sendingAddress;
        this.receivingAddress = receivingAddress;
        this.web3 = new Web3(Web3.givenProvider || this.network);
        this.abi = JSON.parse(abiData.result);
        this.pk = Buffer.from(privateKeySender, 'hex');
    }

    monkeyBabble(){
        // This is a non-ethereum practice async promise 
        return Promise.resolve()
            .then(() => {
                throw new Error("Ooo Ooo Haa Haa");
            })
            .catch((error) => {
                console.error('onRejection function called - Error: ' + error.message);
            })
            .then(() => {
                console.log("This .then() is always called even if the prior promise rejects");
            });
    }

    bananaStash(address = this.address) {
        // Console.log an Ether balance for an account
        this.web3.eth.getBalance(address)
            .then((result) => {
                console.log("Ether Balance: " + this.web3.utils.fromWei(result, 'ether'));
            })
            .catch((error) => {
                console.error('onRejected function called: ' + error.message);
            });
    }

    countTransactions() {
        // console.log the number of sent transactions an account has.
        this.web3.eth.gettransactioncount(this.address)
            .then((result) => console.log("total transactions: " + result))
            .catch((error) => {
                console.error('onrejected function called: ' + error.message);
            });
    }


    callingAContract(address = this.address, contractAddress) {
        // Interacts with the Basic Attention Token (BAT) Ethereum smart contract methods
        var contract = new this.web3.eth.Contract(this.abi, contractAddress);

        contract.methods.name().call({from: address}).then((result) => console.log(result));
        contract.methods.symbol().call({from: address}).then((result) => console.log(result));
        contract.methods.totalSupply().call({from: address}).then((result) => console.log(result));
    }

    listingAccounts() {
        // Loops through a list of accounts the node controls.
        // Refactor for loop using forEach(() => console.log())
        this.web3.eth.getAccounts()
            .then((accounts) => {
                console.log("Accounts: ");
                for (let i = 0; i < accounts.length; i++) {
                    console.log(i+1 + ": " + accounts[i]);
                }
            })
            .catch((error) => {
                console.error('onrejected function called: ' + error.message);
            });
    }

    transaction(){
        /*
        * Set up a raw tx using the transaction vrariables.
        * Sign the transaction with the private key of the sender 
        * this.web3.eth.getBalance(this.sendingAddress).then(console.log);
        */ 

        // The gas you pay covers the cost of computing your transaction.
        // 1,000,000,000 Gwei (1e9 wei) = 1 ETH
        // 1,000,000,000,000,000,000 Wei (1e18 wei) = 1 ETH
        var rawTx = {
            nonce: 5, 
            to: this.receivingAddress,
            gasPrice: 20000000,     // I will pay 20,000,000 Gwei per unit of gas.
            gasLimit: 30000,        // I have a limit of 30,000 units of gas for this transaction.
            value: 2000000000000,   // Ether in units of Wei
            data: "0x00" // Must start with 0x. Import for tx to a contract account.
        };

        const tx = new EthereumTx(rawTx);
        tx.sign(this.pk);
        const serializedTx = tx.serialize();

        this.web3.eth.sendSignedTransaction(serializedTx);
    } 
    
    mechanics() {
        this.web3.eth.getGasPrice()
            .then(result => {
                let num = new Number(result).toExponential();
                console.log("Price of gas: " + num + " Wei");
            })
            .catch(error => { console.error('I did not work :( ' + error) });
        
        this.web3.eth.getBlockNumber()
            .then(blockNumber => {
                console.log("Block Number: " + blockNumber);
                return blockNumber;
            })
            .then(bn => {
                this.web3.eth.getBlockTransactionCount(bn)
                    .then(result => {
                        console.log('Block Transactions: ' + result);
                    })
                    .catch(error => console.error(error));
                
                this.web3.eth.getUncle(bn, 0)
                    .then(result => {
                        console.log('Uncle :');
                        console.log(result);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => {console.error("I am a misserable failure.")});

    }
}

function _run() {
    let urlTest =  'https://rinkeby.infura.io/v3/838c10f41e774020ad023148c6c4e9f2';
    let urlMain = 'https://mainnet.infura.io/v3/838c10f41e774020ad023148c6c4e9f2';
    let addr = '0x675CdD9ca2058bb84810b270FF557ecF19d7fCaB'

    let monkeyAround = new MonkeyAround(network=urlTest, address=addr);

    monkeyAround.monkeyCallContract();
    monkeyAround.monkeyBabble()
    monkeyAround.countBananas(address);
    monkeyAround.countTradedBananas(address);
}
if(require.main == module)    _run();module.exports.MonkeyAround = MonkeyAround;
