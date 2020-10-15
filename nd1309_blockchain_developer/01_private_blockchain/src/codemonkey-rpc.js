// Imports
// start the server:
// ./bitcoind -daemon -rpcuser=toilethill -rpcpassword=glurpglop -server
// to stop
// ./bitcoin-cli -rpcuser=toilethill -rpcpassword=glurpglop stop
const SHA256 = require('crypto-js/sha256');
const BitcoinMessage = require('bitcoinjs-message');
const Bitcoin = require('bitcoinjs-lib');
const Client = require('bitcoin-core');
const client = new Client({
    port:'8332',
    network: 'testnet',
});
client.getBlockchainInformation();
