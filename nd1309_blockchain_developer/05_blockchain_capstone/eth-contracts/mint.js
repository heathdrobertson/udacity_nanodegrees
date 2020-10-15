const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require('web3')
const ganache = require("ganache-cli");

const NetworkConfig = require('./network-config.json');
const Config = require('./config/config.json');

const MNEMONIC = NetworkConfig.mnemonic;
const NFT_CONTRACT_ADDRESS = NetworkConfig.nft_contract_address;
//const NFT_CONTRACT_ADDRESS = Config.verifierAddress;
const OWNER_ADDRESS = NetworkConfig.owner_address;
const NETWORK = NetworkConfig.network;
const INFURA_KEY = NetworkConfig.key;
const NFT_ABI = require("./build/contracts/SolnSquareVerifier.json");

const Proof = require("../zokrates/code/square/proof_3_true.json");

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}


async function main() {
    console.log("Entre the Sand Man");
    provider = new HDWalletProvider(MNEMONIC, NetworkConfig.url);
    const web3Instance = new web3(
        provider
    );
    
    const nftContract = new web3Instance.eth.Contract(NFT_ABI.abi, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })
    await nftContract.methods.tokenMinter(
        OWNER_ADDRESS,
        2,
        Proof.proof.a,
        Proof.proof.b,
        Proof.proof.c, 
        Proof.inputs
    ).send({ from: OWNER_ADDRESS })
    .then((result) => {
        console.log("Minted creature. Transaction: " + result.transactionHash)
    });
}

main();
