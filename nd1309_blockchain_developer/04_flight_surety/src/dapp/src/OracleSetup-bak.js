import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import HDWalletProvider from '@truffle/hdwallet-provider';

const Tx = require('ethereumjs-tx');
import FlightSuretyApp from './contracts/FlightSuretyApp.json';
import Config from '../config.json';

const mnemonic = "involve loop regret humble video wall help risk snow tenant initial victory";
//const infuraUrl = "wss://rinkeby.infura.io/ws/v3/fcae7c8f56044cba84ea7f4a9a65766b";
//const infuraUrl = "wss://rinkeby.infura.io/ws/v3/518b7a66f1e5419397d9f646cdf80db7";
const infuraUrl = "wss://rinkeby.infura.io/ws/v3/db86ef922775473f90a9ec0d53b56346";

const Wallet = new HDWalletProvider(mnemonic, infuraUrl, 0, 50)
const accounts = Wallet['addresses'];
const wallets = Wallet['wallets'];

const admin = accounts[0];
const oracleAddresses = accounts.slice(1,41);

const config = Config['rinkeby'];
const reg = /https|http/;
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace(reg, 'wss')));

const flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
const oracles = [];

const pk = web3.utils.bytesToHex(wallets[admin].privKey).slice(2,);
const privateKey = Buffer.from(pk, 'hex');

const ETH = (wei) =>{
        return web3.utils.fromWei(wei, 'ether')
}

const WEI = (eth) =>{
        return web3.utils.toWei(eth)
}
let nonce = 0;
const getNonce = (idx) => {
        web3.eth.getTransactionCount(admin, (error, result) => {
                if(error){
                        console.error(error);
                }
                nonce =  (result + idx);
        });
}

const topUp = web3.utils.toHex(WEI('0.001'));

const init = () => {
        console.log("Lodding...");
}
const setup = () => {
        const loadOracleAddresses = (addr, nonce) => {
                // 409a134c91fd4558ca3bd6fa165bd2b02b7e3f9e74d690eeef55684e11c885c0
                // Trim the 0x off of privatekey
                const rawTx = {
                        nonce: web3.utils.toHex(nonce),
                        gasPrice: web3.utils.toHex(100000000),
                        gasLimit: web3.utils.toHex(1000000),
                        to: addr,
                        from: admin,
                        value: topUp
                }
                const tx = new Tx(rawTx);
                tx.sign(privateKey);
                const serializedTx = tx.serialize();
                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                        .on('transactionHash', (hash) => {
                                console.log(hash);
                        })
                        .on('receipt', (receipt) => {
                                console.log(receipt);
                        })
                        .on('confirmation', (confirmationNumber, receipt) => {
                                console.log(confirmationNumber + " : " + receipt)
                        })
                        .on('error', console.error);
        }

        oracleAddresses.map((addr, idx) => {
                getNonce(idx + 1);
                const accountBalance = web3.eth.getBalance(addr, (error, response) => {
                        const bal = parseFloat(ETH(response));
                        if (0 < bal && bal < 0.001 && nonce > 0){
                                console.log("Loading Oracale # " + idx  + " balance = " + bal + " - Nonce: " + nonce);
                                loadOracleAddresses(addr, nonce);
                        } else {
                                console.log("Oracle: " + idx + " - Balance: " + bal);
                        }
                })

        })
}

init();
//setup();

const useRegisterOracles = () => {
        //console.log(web3.eth.getAccounts());
        /*
        const handleLoadOracle = (e) => {
        }
        */
}

export { useRegisterOracles }
