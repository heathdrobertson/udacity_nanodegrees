const Infura = require('./Infura.json');
const path = require('path')
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    contracts_build_directory: path.join(__dirname, "src/dapp/src/contracts"),
    networks: {
        develop: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network 
            accounts: 50,
            websockets: true
        },
        rinkeby: {
            provider: () => new HDWalletProvider(Infura['mnemonic'], Infura['url'], 0, 50),
            network_id: 4,       // Ropsten's id
            gas: 5500000,        // Ropsten has a lower block limit than mainnet
            from: '0x09574a5f89a464612ba6AD1B2d8FD1B983C10b96',
            confirmations: 2,    // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        }
    },

    mocha: {
        useColors: true
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.5.1"    // Fetch exact version from solc-bin (default: truffle's version)
        }
    }
}
