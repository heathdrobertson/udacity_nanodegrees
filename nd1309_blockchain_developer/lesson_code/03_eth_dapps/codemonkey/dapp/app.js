const monkey = require('./codemonkey_play.js');

if(require.main == module){

    // Network URLs
    let urlTest = 'https://rinkeby.infura.io/v3/838c10f41e774020ad023148c6c4e9f2';
    let urlMain = 'https://mainnet.infura.io/v3/838c10f41e774020ad023148c6c4e9f2';
    let urlGanache = 'HTTP://127.0.0.1:8545';
    // Addresses
    let aT = '0x675CdD9ca2058bb84810b270FF557ecF19d7fCaB';      //  Test Network Rinkeby
    let aM = '0x675CdD9ca2058bb84810b270FF557ecF19d7fCaB';     //  Main Network
    let aG = '0xb72f3292D10579240c7Fa6520B02e765966366F3';      //  Ganache
    let aGS = '0x66653d71d145d06b5c851983F942F11aDe6c256b';     //  Ganache Sender
    let aGR = '0x26ED61688820Aa02f153688137637D1FA5FCb002';     //  Ganach Receiver
    let aC = '0x0D8775F648430679A709E98d2b0Cb6250d2887EF';      //  Contract
    // Keys
    let pk = '9fc022ad652545b0faedf5c801fd64cecb55c2d0db2fbbc251cf069fd8d0f7cd'; // Private Key for Sender account (aGS) with the leading 0x removed.
    // Ethereum Network MonkeyArround instance creation.
    let monkeyAround = new monkey.MonkeyAround(
        network = urlGanache,
        address = aG,
        sendingAddress = aGS,
        receivingAddress = aGR,
        privateKeySender = pk
    );
 
    // Ethereum Network Function Calls
    // monkeyAround.monkeyBabble();             // Example Promise function
    monkeyAround.bananaStash();             // Get account balance
    // monkeyAround.bananaStash(aGS);             // Get account balance
    // monkeyAround.bananaStash(aGR);             // Get account balance
    // monkeyAround.countTransactions();       // Create a transaction
    // monkeyAround.callingAContract(aC);     // Call contract methods
    // monkeyAround.listingAccounts();           // List accounts on Ganache local blockchain
    // monkeyAround.transaction();
    // monkeyAround.mechanics();
}
