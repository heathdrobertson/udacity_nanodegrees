# Erthereum Dapp Development Environment
__NixOS Docker Container with Nix Shell__

- `build.nix` is a Nix Expression.
- `eth.nix` is a Nix Expression.

## Create and Start a Docker Container with ```run```.
**(Terminal Window 1 of 3)**
```bash
docker run --volumes-from=nix -it \
    -v $(pwd):/app \
    -w /app \
    -p 3000:3000 \
    -p 3001:3001 \
    -p 8545:8545 \
    nixos/nix nix-shell /app/.config/build.nix
```

To setup your project.

```bash
npm init
```

If your container is already created but not running.

```bash
docker ps -a
```

Make a note of the ```<container-name>```

```bash
docker start <container-name>
```
Then a iteractive session into the running container.
```bash
docker exec -it <container-name> nix-shell /app/.config/eth.nix
```

## Interactive Session in the Container
**(Terminal window 2 of 3)**
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
ganache-cli --host "0.0.0.0" \
    --mnemonic "scissors shrimp together high travel wall orient claim leaf pretty vacuum glow"
 ```


In Metamask, from the Networks dropdown, sellect `http://127.0.0.1:8545`, you may need to create a new newtwork with `Custom RPC`, and it should pickup the 10 accounts spun up by Ganache.

In Metamask under `Restore account?` click  `Import using account seed phrase` and paste the 12 words to import the accounts created by Ganache CLI.

## Another Interactive Session into the Container
**Terminal window 3 of 3**
```bash
docker exec -it <container-name> nix-shell /app/.config/eth.nix
```
```bash
npm init
```
```bash
npm run dev
```

If the frontend is in an `app` directory `cd` to `app` first.

Update the `host` and `port` in `webpack.config.js` to serve from the container.

```javascript
...

  devServer: { 
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      host: '0.0.0.0',
      port: 3000
  },

...
```

