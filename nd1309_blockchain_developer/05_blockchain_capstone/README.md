# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Decentalized House Listing Service

- Mint your own tokens to represent your title to the properties. 
- Before you mint a token, you need to verify you own the property. 
- Use zk-SNARKs to create a verification system which can prove you have title to the property.
    - Without revealing that specific information on the property.
- After the token has been verified you will place it on a blockchain market place (OpenSea) for others to purchase. 

---

# Testing Code
1. Running Truffle Console
    ```bash
    cd eth-contracts/
    ```
    ```bash
    truffle develop
    ```
    ```bash
    truffle(develop)> test
    ```
2. Running Ganache-CLI - Terminal 1
    ```bash
    ganache-cli
    ```
3. Running Ganache-CLI - Terminal 2
    ```bash
    cd eth-contracts/
    ```
    ```bash
    truffle --network development test
    ```

- Contract Addresses
    - SquareVerifier - [0xC6035BEEeB8e017626b9FDD0630F9d9655430A86](https://rinkeby.etherscan.io/address/0xC6035BEEeB8e017626b9FDD0630F9d9655430A86)
    - SolnSquareVerifier - [0xe4c5ED051746275Fd099276866CEDB292AeeEB78](https://rinkeby.etherscan.io/address/0xe4c5ED051746275Fd099276866CEDB292AeeEB78)
- [Contract Abi's](./eth-contracts/build/contracts)
- [Store Front](https://rinkeby.opensea.io/assets/toilethill-real-estate-ownership-transfer?embed=true&ref=0x55466fc7cd33e6791d7e2246fe7496783cc6ed4f)
# Links

## Project Deliverables

- [x] Write Up - Student includes a README to explain how to test their code.
- [x] Write Up - Student provides Contract Addresses, Contract Abi's, OpenSea MarketPlace Storefront link's.


## ERC721

- [x] ERC721 Mintable Contract - Student completes the boilerplate ERC721 Mintable Contract in ERC721Mintable.sol
- [x] ERC721 Mintable Contract Test Cases - Student writes and passes the test cases in TestERC721Mintable.js
- [x] ERC721 Mintable Contract Zokrates Test - Student writes and passes the test cases in 'TestSquareVerifier.js'
- [x] ERC721 Mintable Contract Zokrates Test Cases - Student writes and passes the test cases in TestSolnSquareVerifier.js


## Zokrates

- [x] Zokrates program written using DSL - Student completes the Zokrates proof in square.code by adding the variable names in square.code
- [x] Zokrates Test Cases - Student completes test contract in SolnSquareVerifier.sol
- [x] Zokrates Test Cases - Student writes and passes the test cases in 'TestSolnSquareVerifier.js'


## OpenSea Marketplace

- [x] Market Place - Student list ERC721/ ZoKrates tokens & complete transactions on market place


## Deployment

- [x] Deployment - Student deploys ERC721 contracts with Zokrates integration.


```bash
docker run --name zokrates --volume $(pwd):/home/zokrates/code -it zokrates/zokrates /bin/bash
```

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
