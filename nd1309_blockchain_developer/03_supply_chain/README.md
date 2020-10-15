# Suppy Chain Dapp
__Ethereum Dapp for Tracking Items through Supply Chain__

*Project 03 of Udacity's Blockchain Developer Nanodegree ND1309*

1. [UML Diagrams](./README.md#uml-sheets)
1. [Libraries](./README.md#libraries)
1. [IPFS](./README.md#ipfs)
1. [Summary](./README.md#summary)
1. [Deployed Contracts](./README.md#deployed-contracts)
1. [Links](./README.md#links)

## UML Sheets

### Activity Diagram
![Diagram](./assets/coffeefarmer-activity.svg)

### Sequence Diagram
![Diagram](./assets/coffeefarmer-sequence.svg)

### State Diagram
![Diagram](./assets/coffeefarmer-state.svg)

### Data Model
![Diagram](./assets/coffeefarmer-data.svg)

## Libraries
- Truffle Framework: A development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine.
- Web3: Is a collection of libraries which allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection.
- Infura: Scalable API access to the Ethereum and IPFS networks. 
- OpenZepplin: Contracts to help minimize risk by using battle-tested libraries of smart contracts for Ethereum and other blockchains.
- @Triffle/hdwallet-provider: HD Wallet-enabled Web3 provider. Use it to sign transactions for addresses derived from a 12 or 24 word mnemonic.

## IPFS
Not yet implamented in this project.

## Summary
Coffee Supply Chain Dapp, tracks the stages' coffee goes through from production to consumer.  All actors, contract owner, farmers, distributors, retailers, and consumers have a unique Ethereum blockchain address and are responsible for tracking authenticity.  This address is used to track ownership of the coffee.  

Ownership flow controls the state of the coffee items and the actors updated the state of items along the supply chain. Farmers, harvest, process, pack, and add items for sale, distributors buy and ship, retailers receive and consumers purchase.   The producer or farmer is the initial owner of the coffee and adds the coffee items (pallets) to the blockchain.  When an item is added to the blockchain, the coffee's origin information; UPC, SKU,  product ID, farmer ID, farm name, origin information, farm latitude and longitude, notes, and price, is added by the farmer. 


## Deployed Contracts
- Owner Account: [0x7e02Fa8dDc9Ea8491B1Ff9Ac601C02Cf9E212b71](https://rinkeby.etherscan.io/address/0x7e02Fa8dDc9Ea8491B1Ff9Ac601C02Cf9E212b71)

### SupplyChain

- TX hash: [0x5c5af4fee5752e90f4eded3fbc469b66a9c449fbe2f19b6fd8114121f5baf633](https://rinkeby.etherscan.io/tx/0x5c5af4fee5752e90f4eded3fbc469b66a9c449fbe2f19b6fd8114121f5baf633)
- Contract address: [0xf059bae18723639b6aFbE8C93A6F8695Fe47e951](https://rinkeby.etherscan.io/address/0xf059bae18723639b6aFbE8C93A6F8695Fe47e951)

### FarmerRole

- TX hash: [0xfffdd3aa8a7a3536301868fae35f53eb3a1a964b8201326a535221ec36caeecfa](https://rinkeby.etherscan.io/tx/0xfffdd3aa8a7a3536301868fae35f53eb3a1a964b8201326a535221ec36caeecfa)
- Contract address: [0xD1d40A8445295C5FEe364b0142DdecB133EbFd48](https://rinkeby.etherscan.io/address/0xD1d40A8445295C5FEe364b0142DdecB133EbFd48)
 
### DistributorRole
- TX hash: [0x881775d5958d286ba619c03fc8c533e7b182dcb1b882816a0710c442b2a5c955](https://rinkeby.etherscan.io/tx/0x881775d5958d286ba619c03fc8c533e7b182dcb1b882816a0710c442b2a5c955)
- Contract address: [0x9e0957A868dE961F0D61cC39e537Fb4E3971e696](https://rinkeby.etherscan.io/address/0x9e0957A868dE961F0D61cC39e537Fb4E3971e696)

### RetailerRole
- TX hash: [0xc8b910b97f44314c83157bac74f6b8018fc8483c3b286da52a821bacbb0cedb1](https://rinkeby.etherscan.io/tx/0xc8b910b97f44314c83157bac74f6b8018fc8483c3b286da52a821bacbb0cedb1)
- Contract address: [0x8797064091Ca50c4b849218b6Ff6e13Bc1F9893C](https://rinkeby.etherscan.io/address/0x8797064091Ca50c4b849218b6Ff6e13Bc1F9893C)

### ConsumerRole
- TX hash: [0x77621448c312c1d6d5edf68265747f280a7ace9a3985e259b52c69efe6a304c7](https://rinkeby.etherscan.io/tx/0x77621448c312c1d6d5edf68265747f280a7ace9a3985e259b52c69efe6a304c7)
- Contract address: [0xF016Db7AC17b731F231019d3d498069bF944c42C](https://rinkeby.etherscan.io/address/0xF016Db7AC17b731F231019d3d498069bF944c42C)


### Links

- [Project Starter Files](https://github.com/udacity/nd1309-Project-6b-Example-Template)
- [Project Instructions](./PROJECT.md)

NixOS Docker Container running an interactive Nix Shell [Config Files](.config/config.md)

