# Ethereum Dapp Development Environment
__NixOS Docker Container with Nix Shell__


---
- [`create` and `start` a Docker Container with ```run```.](#create-and-start-a-docker-container-with-run)
    + [Truffle-Drizzle-Vue Detour](#truffle-drizzle-vue-detour)
- [Running Ganache-cli](#running-ganache-cli)
- [Running the Frontend Server](#running-the-frontend-server)
- [Additonal Notes](#additonal-notes)

---

## `create` and `start` a Docker Container with ```run```.
**An Interactive Session in a Container** *(Terminal Window 1 of 3)*
```bash
docker run \
    -it \
    --volumes-from=nix \
    -v $(pwd):/app \
    -w /app \
    --name section6 \
    -p 8080:8080 \
    -p 8545:8545 \
    -p 9545:9545 \
    nixos/nix nix-shell /app/.config/build.nix
```

You should now be running a `nix-shell` in a container.

```bash
[nix-shell:/app]#
```

If your container is already created but not running.

```bash
docker ps -a
```

Make a note of the ```<container-name>```

```bash
docker start <container-name>
```

Then execute an iteractive session into the running container.

```bash
docker exec -it <container-name> nix-shell /app/.config/eth.nix
```

> ### Truffle-Drizzle-Vue Detour
> 
> To setup a new [Truffle-Drizzle-Vue][1] project.
> 
> ```bash 
> $ truffle unbox vue-box
> ```
> 
> Here are the basic commands for a [Truffle-Drizzle-Vue][1] project.  You will need to subsitute `npm run serve` with `npm run dev` in terminal window #3 below.

[Top]


## Running Ganache-cli
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
ganache-cli --host "0.0.0.0" \
    --mnemonic  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

ganache-cli --host "0.0.0.0" \
    --mnemonic "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

 ```


In Metamask, from the Networks dropdown, sellect `http://127.0.0.1:8545`, you may need to create a new newtwork with `Custom RPC`, and it should pickup the 10 accounts spun up by Ganache.

In Metamask under `Restore account?` click  `Import using account seed phrase` and paste the 12 words to import the accounts created by Ganache CLI.

[Top]

## Running the Frontend Server
**An Interactive Session in the Container** *(Terminal Window 3 of 3)*
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
      port: 3000 // Or 8080
  },

...
```

[Top]

## Additonal Notes

- `build.nix` is a Nix Expression, with a `shellHook` that `npm install`'s ethereum development packages.  
- `eth.nix` is the same Nix Expression, without any `shellHook` commands to run when `exec -it`ing into a running container.
- Note that the development build is not optimized, for VueJS Dapp or Vapp; `cd vapp`.
    - To create a production build, run ```npm run build```.

### Notes on Setting Up VueJS, Bootstrap Vue, and Sass

Follow the steps outlined here to get Bootstrap Vue integrated.

[bootstrap-vue setup](https://bootstrap-vue.js.org/docs/)

[vue.config.js file for component src files](https://bootstrap-vue.js.org/docs/reference/images/#vue-cli-3-support)

[Sass setup](https://sass-lang.com/install)

You will need to install Sass and setup Preporcessing while building out the UI

To compile a `scss` file to `css`:

```bash
sass /path/to/custom.scss /path/to/custom.css
```

Add the `--watch` flag if you want to run the preprossessor on each change to `.scss` files.

- [Drizzle Vue]
- [Bootstrap Vue]
- [Bootstrap]
- [Sass]

### Links

[Drizzle Vue]: https://www.trufflesuite.com/boxes/drizzle-vue-box 
[Bootstrap Vue]: https://bootstrap-vue.js.org/docs/
[Bootstrap]: https://getbootstrap.com/docs/4.4/getting-started/introduction/
[Sass]: https://sass-lang.com/documentation


[1]: https://github.com/trufflesuite/drizzle/blob/develop/packages/vue-plugin/test-app/README.md
[Top]: #ethereum-dapp-development-environment
