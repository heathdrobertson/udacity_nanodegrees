var HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

module.exports = {
  networks: {
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://0.0.0.0:8545/", 0, 50);
      },
      network_id: '*',
      gas: 5500000
    }
  },
  compilers: {
    solc: {
        version: "^0.5.15"
    }
  }
};
