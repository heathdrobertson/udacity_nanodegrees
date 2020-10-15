# Lesson 3. Star Notary V1

## Quickstart
1. Run a container and build nix shell environment. 
```bash
 docker run --rm --volumes-from=nix -it -v $(pwd):/app -w /app -p 3000:3000 -p 3001:3001 -p 8545:8545 nixos/nix nix-shell /app/.config/build.nix
```
1. Open a Nix Shell in your running container.
```bash
docker exec -it <container-name> nix-shell /app/.config/eth.nix
```
1. ganche-cli 
```bash
ganache-cli --host 0.0.0.0 
```
1. Open another Nix Shell in your running container.
```bash
docker exec -it <container-name> nix-shell /app/.config/eth.nix
```
```bash
npm run dev
```
1. I updated the webpack-config.js to serve from host 0.0.0.0 and port 3000 from inside the container.


For this you will need to use the latest version of Truffle and Metamask

- Truffle: Truffle v5.0.2 - a development framework for Ethereum
- Metamask: 5.3.1

If you need to update truffle to the latest version use:
`npm install -g truffle`

If you need to update Metamask just delete your Metamask extension and install it again.
