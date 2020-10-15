import Web3 from "web3";

const address = '0xb72f3292D10579240c7Fa6520B02e765966366F3';
console.log(" Change me! Here I am ");
// Connect a the web3 provider
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:8545");
}

console.log(web3);
// Set a default account
web3.eth.defaultAccount = web3.eth.accounts[0];

// Get the contract address
var RemixContract = new web3.eth.Contract([
        {
            "constant": false,
            "inputs": [
                {
                    "name": "x",
                    "type": "string"
                }
            ],
            "name": "setMessage",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getMessage",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ], '0xE87074a3d5d3335D7Ba58358bfFF6238B06c1868');

// Get the contract abi
var myMessage = RemixContract.methods.getMessage().call({from: address})
    .then((result) => console.log(result))
    .catch((error) => {console.error(error)});

function testMe(){
    alert(myMessage);
}

function onLoad(){
    console.log("Page Loader");
}
