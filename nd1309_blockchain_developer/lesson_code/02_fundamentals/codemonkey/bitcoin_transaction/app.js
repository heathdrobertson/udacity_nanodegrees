/*
 * Deprecation Warning: TransactionBuilder will be removed in the future. 
 * (v6.x.x or later) Please use the Psbt class instead. Examples of usage are
 * available in the transactions-psbt.js integration test file on our Github. 
 * A high level explanation is available in the psbt.ts and psbt.js files as 
 * well. DEPRECATED: TransactionBuilder sign method arguments will change in 
 * v6, please use the TxbSignArg interface
*/

const SHA256 = require('crypto-js/sha256');
const bitcoinMessage = require('bitcoinjs-message');
const bitcoin = require('bitcoinjs-lib');

let network = bitcoin.networks.testnet;  // Replace testnet with to access bitcoin or regtest - https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/networks.js

class BTCBuilder {
    constructor(network){
        this.name = "BTC Builder"
        this.keypair = bitcoin.ECPair.makeRandom(network);
        this.privatekey = this.keypair.privateKey;
        this.WIF = this.keypair.toWIF(); 
    };

    toPrint(){
        console.log("Private Key: " + this.privatekey + " WIF:" + this.WIF);
    }
}
// let keypair = bitcoin.ECPair.fromWIF(WIF, network);
// let payment = bitcoin.payments.p2pkh({ pubkey: publicKey, network: network });
// let address = payment.address;

let WIF = "cTj9t2jUtcGkWN5wGLQVGFn7uFhvDAucmhPJhnoRLEi2FDPHfEqw";
let addressFrom = "n1ZagaKS5fqUDpxXn2z3N4iA73mLnU4rZG";

let addressTo = "2N3A3KM37ePAosUZCS4TbysD6MBz7NjKmrS"; // Bitcoin Core testnet receiving address
let addressTo2 = "2NDhAv1PnZimzg8Xp2Fka2j22bUw7qggdep"; // Bitcoin Core testnet sending address

// Create a transaction
let txb = new bitcoin.TransactionBuilder(network);
let txid = "b5d896dfe607f62bd20e848eb057217b1cd7e26954f1f09c8e7c77cacdc551f5";
let outs = 0;

// Transaction details
let amountSend = 2100000; // Int Balance received: 2169136
let amountBalance = 69136;
let feeAmount = 19358;

// Input(s) to transaction.
txb.addInput({hash: txid, index: outs});

// Output
txb.addOutput({address: addressTo, value: amountSend});
txb.addOutput({address: addressFrom, value: amountBalance - feeAmount}); // This is the change sent back to address

let keypairSpend = bitcoin.ECPair.fromWIF(WIF, network);
txb.sign(0, keypairSpend);

// Build and make readable
let tx = txb.build().toHex();

function run() {    
    // address: n1ZagaKS5fqUDpxXn2z3N4iA73mLnU4rZG
    // privatekey: cTj9t2jUtcGkWN5wGLQVGFn7uFhvDAucmhPJhnoRLEi2FDPHfEqw
    // console.log('Building a raw Bitcoin transaction on a test network.\nYou will need 2 wallets setup in Bitcoin Core, #1 sending #2 receiving.');
    // console.log("Address: " + addressFrom + "WIF: " + WIF);
    // console.log('='.repeat(100));
    // console.log(tx);
    let built = new BTCBuilder();
    built.toPrint();
}

if(require.main == module)
    run();
