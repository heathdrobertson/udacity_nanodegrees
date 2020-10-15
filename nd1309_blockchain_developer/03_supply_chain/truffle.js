const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "539df43fb2084ba7be65ea2da46e6219";
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 9545,
            network_id: "*" // Match any network id
        },
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
            network_id: 4,       // Ropsten's id
            gas: 5500000,        // Ropsten has a lower block limit than mainnet
            from: '0x7e02Fa8dDc9Ea8491B1Ff9Ac601C02Cf9E212b71',
            confirmations: 2,    // # of confs to wait between deployments. (default: 0)
            timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
        },
    },
    compilers: {
        solc: {
            version: "0.6.1",
        },
    },
};
