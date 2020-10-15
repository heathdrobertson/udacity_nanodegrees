import FlightSuretyApp from './contracts/FlightSuretyApp.json';
import Config from '../config.json';
import Infura from '../../../Infura.json';

import Web3 from 'web3';
import BigNumber from 'bignumber.js';
const Tx = require('ethereumjs-tx');

import HDWalletProvider from '@truffle/hdwallet-provider';

const Wallet = new HDWalletProvider(Infura['mnemonic'], Infura['url'], 0, 50)
const accounts = Wallet['addresses'];
const wallets = Wallet['wallets'];

const config = Config['rinkeby'];
const reg = /https|http/;
const web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace(reg, 'wss')));

const flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
const oracles = [];

const Oracles = async () => {
        console.log('INIT');
        //const accounts = await web3.eth.getAccounts();
        //console.log(accounts);

        const NUMBER_OF_ORACLES = 40;
        registerOracles(accounts.slice(1, NUMBER_OF_ORACLES + 1));

        flightSuretyApp.events.OracleRequest({fromBlock: 0}, (error, event) => {
                if (error) return console.log(error);
                if (!event.returnValues) return console.error("No returnValues");

                respondToFetchFlightStatus(
                        event.returnValues.index,
                        event.returnValues.airline,
                        event.returnValues.flight,
                        event.returnValues.timestamp
                )
        });
}

const rawTxSetup = async (OracleAddress) => {

        let newTx = {};

        const fee = await flightSuretyApp.methods.REGISTRATION_FEE().call();
        const pk = await web3.utils.bytesToHex(wallets[OracleAddress].privKey).slice(2,);
        const privateKey = Buffer.from(pk, 'hex');

        await web3.eth.getTransactionCount(OracleAddress, (error, result) => {

                if(error){
                        console.error(error);
                }

                //const rawTx = {
                //        nonce: web3.utils.toHex(result),
                //        gasPrice: web3.utils.toHex(100000000),
                //        gasLimit: web3.utils.toHex(1000000),
                //        from: web3.utils.toHex(OracleAddress),
                //        value: web3.utils.toHex(fee)
                //}
                const rawTx = {
                        nonce: result,
                        gasPrice: 100000000,
                        gasLimit: 1000000,
                        from: OracleAddress,
                        value: fee
                }
                const tx = new Tx(rawTx, {chain: 'rinkeby'});
                tx.sign(privateKey);
                console.log(tx);
                return tx;
                
        });
}

const registerOracles = async (oracleAccounts) => {

        const fee = await flightSuretyApp.methods.REGISTRATION_FEE().call();
        const STATUS_CODES = [0, 10, 20, 30, 40, 50];
        for (let i = 0; i < oracleAccounts.length; i++) {

                const address = oracleAccounts[i];
                const statusCode = STATUS_CODES[Math.floor(Math.random() * STATUS_CODES.length)];
                
                const tx = await rawTxSetup(address);
                await flightSuretyApp.methods.registerOracle().send(tx, {from: address});

                //await flightSuretyApp.methods.registerOracle().send({
                //        from: address,
                //        value: fee,
                //        gas: 3000000
                //});

                const indexes = await flightSuretyApp.methods
                        .getMyIndexes()
                        .call({ from: address });

                oracles.push({ address, indexes, statusCode });
                console.log({ address, indexes, statusCode });
        }

        console.log(`${oracles.length} Oracles Registered`);
}

const respondToFetchFlightStatus = async (index, airline, flight, timestamp) => {

        if (oracles.length === 0) return;

        console.log("New request ************************")
        console.log(index, airline, flight, timestamp);

        const relevantOracles = [];

        oracles.forEach((oracle) => {
                if ( BigNumber(oracle.indexes[0]).isEqualTo(index) ) relevantOracles.push( oracle );
                if ( BigNumber(oracle.indexes[1]).isEqualTo(index) ) relevantOracles.push( oracle );
                if ( BigNumber(oracle.indexes[2]).isEqualTo(index) ) relevantOracles.push( oracle );
        });

        console.log(`${relevantOracles.length} Matching Oracles will respond`);

        relevantOracles.forEach( (oracle) => {
                flightSuretyApp.methods
                        .submitOracleResponse(index, airline, flight, timestamp, oracle.statusCode)
                        .send({ from: oracle.address, gas: 5555555 })
                        .then(() => {
                                console.log("Oracle responded with " + oracle.statusCode);
                        })
                        .catch((err) => console.log("Oracle response rejected"));
        });
}


export default Oracles;
