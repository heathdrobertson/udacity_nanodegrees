# Ethereum Dapp Development Environment
__NixOS Docker Container with Nix Shell__


## *Terminal 1 -* Truffle 
**Create a Docker container and start an interactive session in the container**

> Change `<container-name>` in the command below.

```bash
docker run -it \
    --volumes-from nix \
    --volumes-from config \
    -v $(pwd):/home \
    -w /home \
    --name project05 \
    -p 9005:9005 \
    -p 3000:3000 \
    -p 3001:3001 \
    -p 8080:8080 \
    -p 8000:8000 \
    -p 8545:8545 \
    -p 9545:9545 \
    nixos/nix nix-shell /home/.config/eth.nix
```

- Container exposed ports:
 - 9005 Firebase verification.
 - 3000 Firebase serve hosting locally.
 - 3001 Firebase serve functions locally.
 - 8080 Oracle server.
 - 8000 Dapp local serve.
 - 8545 Truffle develop.
 - 9545 Truffle console.
- Container serves on IP host address `0.0.0.0` and are accessable via localhost:<port_number> or 127.0.0.1:<port_number> outside of the container.

You should now be running a `nix-shell` in a container.

```bash
[nix-shell:/app]#
```
### Running Truffle Console

```bash
truffle console --network devlop
```

- Make a note of **Mnemonic:** 12 words.
- If you are already logged into [MetaMask](https://metamask.io/) log out.
- In [MetaMask](https://metamask.io/), from the Networks dropdown, sellect `http://127.0.0.1:8545`, you may need to create this newtwork with `Custom RPC`.
- In Metamask under `Restore account?` click  `Import using account seed phrase` and paste in the 12 word mnemonic to import the accounts created by Truffle.

You are now ready to run Truffle related commands in this window.

### Starting an existing container.
**If your container has already been created above and is not running.**

```bash
docker ps -a
```

Make a note of the ```<container-name>```

```bash
docker start <container-name>
```

Then execute an iteractive session into the running container.

```bash
docker exec -it <container-name> nix-shell
```

[Top]


## *Terminal 2 -* Running the Frontend Server
**Start An Interactive Session in the Container** 
```bash
docker exec -it <container-name> nix-shell
```
```bash
npm run dapp
```

To compile the Dapp with Webpack, files will be in the `prod` directory and ready for hosting from a service like Firebase.
```bash
npm run dapp:prod
```

## *Terminal 3 -* Running the Backend Oracle Server
**Start An Interactive Session in the Container** 
```bash
docker exec -it <container-name> nix-shell
```
```bash
npm run server
```

## Using Ganache-cli
**An Interactive Session in the Container** *(Terminal Window 2 of 3)*
```bash
docker exec -it <container-name> nix-shell /app/.config/eth.nix
```

Run Ganache CLI

```bash
ganache-cli --host "0.0.0.0" 
```

Make a note of **Mnemonic:** 12 words.

If you alread have your 12 words, run ganache-cli with the `--mnemonic` flag.
```bash
ganache-cli --host "0.0.0.0" --accounts 50 \
    --mnemonic "detect general virus put ethics raven fever discover despair cargo poverty issue"

ganache-cli --host "0.0.0.0" \
    --mnemonic "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

 ```

In Metamask, from the Networks dropdown, sellect `http://127.0.0.1:8545`, you may need to create a new newtwork with `Custom RPC`, and it should pickup the 10 accounts spun up by Ganache.

In Metamask under `Restore account?` click  `Import using account seed phrase` and paste the 12 words to import the accounts created by Ganache CLI.

[Top]


[Top]: #ethereum-dapp-development-environment
