/**
 * This is the CodeMonkey Controller
 */
class CodeMonkeyController {

    //The constructor receive the instance of the express.js app and the CodeMonkey class
    constructor(app, codeMonkeyObj) {
        this.app = app;
        this.codemonkey = codeMonkeyObj;
        this.getMonkeyDo();
        this.getCodeMonkey();
    }

    // Endpoint to return a BTC Transaction
    getMonkeyDo() {
        this.app.get("/codemonkey/do/", async (req, res) => {
            let monkeyDo = await this.codemonkey.doIt();
            return res.status(200).json(monkeyDo);
        });
    }
    // Enpoint to Get at my monkey arround code and learn Expressjs
    getCodeMonkey() {
        this.app.get("/codemonkey/chatter/:chatters", async (req, res) => {
            if(req.params.chatters) {
                const chatters = parseInt(req.params.chatters);
                let monkeySpeak = await this.codemonkey.speak(chatters);
                if(monkeySpeak){
                    return res.status(200).json(monkeySpeak);
                } else {
                    return res.status(404).send("Speak no evil! Integers > 0 only!");
                }
            } else {
                return res.status(404).send("No CodeMonkey here.");
            }
        });
    }
}

module.exports = (app, codeMonkeyObj) => { return new CodeMonkeyController(app, codeMonkeyObj);}
