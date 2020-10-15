const Web3 = require('web3');

/*##########################
CONFIGURATION
##########################*/
// -- Step 1: Set up the appropriate configuration var Web3 = require("web3") var EthereumTransaction = require("ethereumjs-tx") var web3 = new Web3('HTTP://127.0.0.1:7545')
// -- Step 2: Set the sending and receiving addresses for the transaction. var sendingAddress = 'ADDRESS FROM GANACHE GOES HERE' var receivingAddress = 'ANOTHER ADDRESS FROM GANACHE GOES HERE'
// -- Step 3: Check the balances of each address web3.eth.getBalance(sendingAddress).then(console.log) web3.eth.getBalance(receivingAddress).then(console.log)


/*##########################
CREATE A TRANSACTION
##########################*/
// -- Step 4: Set up the transaction using the transaction variables as shown var rawTransaction = { nonce: 0, to: receivingAddress, gasPrice: 20000000, gasLimit: 30000, value: 1, data: "" }
// -- Step 5: View the raw transaction rawTransaction
// -- Step 6: Check the new account balances (they should be the same) web3.eth.getBalance(sendingAddress).then(console.log) web3.eth.getBalance(receivingAddress).then(console.log)
// Note: They haven't changed because they need to be signed...


/*##########################
Sign the Transaction
##########################*/
// -- Step 7: Sign the transaction with the Hex value of the private key of the sender var privateKeySender = 'PRIVATE KEY OF SENDER GOES HERE' var privateKeySenderHex = new Buffer(privateKeySender, 'hex') var transaction = new EthereumTransaction(rawTransaction) transaction.sign(privateKeySenderHex)


/*#########################################
Send the transaction to the network
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network. var serializedTransaction = transaction.serialize(); web3.eth.sendSignedTransaction(serializedTransaction);
class MonkeyAround{

    constructor() {
        this.network = network;
        this.address = address;
        this.web3 = new Web3(Web3.givenProvider || this.network);
        this.abi = JSON.parse(abiData.result);
    }

    countBananas() {
        this.web3.eth.getBalance(this.address)
            .then((result) => {
                console.log("Ether Balance: " + this.web3.utils.fromWei(result, 'ether'));
            })
            .catch((error) => {
                console.error('onRejected function called: ' + error.message);
            });
    }

    monkeyAccounts() {
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
