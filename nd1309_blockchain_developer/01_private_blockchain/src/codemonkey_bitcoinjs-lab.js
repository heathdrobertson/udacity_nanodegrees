/*
 * Deprecation Warning: TransactionBuilder will be removed in the future. 
 * (v6.x.x or later) Please use the Psbt class instead. Examples of usage are
 * available in the transactions-psbt.js integration test file on our Github. 
 * A high level explanation is available in the psbt.ts and psbt.js files as 
 * well. DEPRECATED: TransactionBuilder sign method arguments will change in 
 * v6, please use the TxbSignArg interface
*/

// Imports
const SHA256 = require('crypto-js/sha256');
const bitcoinMessage = require('bitcoinjs-message');
const bitcoin = require('bitcoinjs-lib');

// Constants
const network = bitcoin.networks.testnet;
const privateKey = 'cTj9t2jUtcGkWN5wGLQVGFn7uFhvDAucmhPJhnoRLEi2FDPHfEqw';
const keyPair = bitcoin.ECPair.fromWIF(privateKey, network);
const publicKey = keyPair.publicKey;
const { address } = bitcoin.payments.p2pkh({
    pubkey: publicKey,
    network: network
});



class CodeMonkey {
    constructor() {
        this.monkeySay = "Oo Oo Ah Ah ";
        this.transaction = "This will be a BTC Transaction ready to broadcast";
    }

    _txBuilder() {
            // Create a transaction
            let txb = new bitcoin.TransactionBuilder(network, 20000);
            let txid = "b5d896dfe607f62bd20e848eb057217b1cd7e26954f1f09c8e7c77cacdc551f5";
            let outn = 0;

            // Transaction details
            let feeAmount = 19358;

            // Input to transaction.
            txb.addInput(
                txid, 
                0
            );

            // Output
            txb.addOutput("2N3A3KM37ePAosUZCS4TbysD6MBz7NjKmrS", 2100000);
            //txb.addOutput("2NDhAv1PnZimzg8Xp2Fka2j22bUw7qggdep", 69136); // This is the change sent back to address

            let keypairSpend = bitcoin.ECPair.fromWIF(privateKey, network);

            txb.sign(0, keypairSpend);

            // Build and make readable
            this.transaction = txb.build().toHex();

            // To broadcast testnet:
            // https://live.blockcypher.com/btc-testnet/pushtx/
    }

    speak(chatters) {
        console.log(this.monkeySay.repeat(chatters));
        return new Promise((resolve, reject) => {
            resolve(this.monkeySay.repeat(chatters));
        });
    }

    doIt() {
        return new Promise((resolve, reject) => {
            let address = "1EqdNx6zbeiunMC6fDyiXD1eaQSBantdvr";
            let message = "1EqdNx6zbeiunMC6fDyiXD1eaQSBantdvr:1574730158:starRegistry";
            let signature = "IJ0UeIdLLY+JiitUbfv/v77CIXGQXe4TiWW0kowNKLBrb3WTgGHNIpyuKt7FMxuhxILmQKzDSA9CkJHLsJ6DLsY=";
            let star = {"star": {
                "dec": "68° 52' 56.9",
                "ra": "16h 29m 1.0s",
                "story": "Testing the story 4"
            }};
            let messageTime = parseInt(message.split(':')[1]);
            let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
            let timeDif = currentTime - messageTime;
            let verified = bitcoinMessage.verify(message, address, signature); 

            let printer = [messageTime, currentTime];
            for (let i = 0; i < printer.length; i++) {
                console.log(printer[i]);
            }
            if (timeDif < 5*60000 && verified == true) {
                resolve(timeDif);
            } else {
                resolve(false);
            }
    });
    }
}

function run() {
    console.log(tx);
}

if(require.main == module)
    run();

module.exports.CodeMonkey = CodeMonkey
