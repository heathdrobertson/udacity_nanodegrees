
var ExerciseC6D = artifacts.require("ExerciseC6D");

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        accounts[0],
        accounts[1],
        accounts[2],
        accounts[3],
        accounts[4],
        accounts[5],
        accounts[6],
        accounts[7],
        accounts[8],
        accounts[9]
    ];


    let owner = accounts[0];
    let exerciseC6D = await ExerciseC6D.new();
    
    return {
        owner: owner,
        testAddresses: testAddresses,
        exerciseC6D: exerciseC6D
    }
}

module.exports = {
    Config: Config
};
