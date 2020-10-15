// migrating the appropriate contracts
const SquareVerifier = artifacts.require("SquareVerifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const fs = require('fs');

module.exports = (deployer) => {
  deployer.deploy(SquareVerifier)
        .then(() => {
            return deployer.deploy(SolnSquareVerifier, SquareVerifier.address)
                .then(() => {
                    const config = {
                        verifierAddress: SquareVerifier.address
                    };
                    fs.writeFileSync(
                        __dirname + '/../config/config.json',
                        JSON.stringify(config, null, '\t'),
                        'utf-8'
                    );
                });
        });
};
