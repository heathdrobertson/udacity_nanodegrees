# Star Notary Version 1.0

1. In one terminal window run a Docker container:
```bash
docker run --rm --volumes-from=nix -it -v $(pwd):/app -w /app -p 3000:3000 -p 3001:3001 -p 8545:8545 nixos/nix nix-shell /app/.config/build.nix
```
```bash
truffle console --network codemonkey
```

1. To start an additional container
```bash
docker exec -it <container-name> nix-shell /app/.config/eth.nix
```
    1. Run Ganache in second terminal:
    ```bash
     ganache-cli --host 0.0.0.0 --networkId codemonkey --mnemonic "attract embody tag hope chief just ketchup pizza leopard roof nature enough"
     ```

## Develop 
__started at [http://127.0.0.1:8545/](http://127.0.0.1:8545/)__

## Accounts:
1. 0x8b1750232b7bca2d65b7507c1f44c8d726e94e87
1. 0xbd6151a92d572944386989a8c2a514b8bf7f52cb
1. 0x7c4aa5794177d8962db438d089ab0d230b6bf6dd
1. 0x41bd55e0bb6b21b6b2dae81f6b50f86bf2fc12e4
1. 0x263ae3fdcff24089309ea3f8f5edb19e89ed4d39
1. 0x26fa97a4d1d310270e6f0af9ecd1587b8b2ec721
1. 0xdd11880fc09fdeb020aea589a0fe863a5b751178
1. 0xa08a220aad11f41aeb80c0644f0aff5c18604a8b
1. 0xc167817ba679d2e56e7969905da04388c23ef42e
1. 0x41faeb99300953ae68f5b9bc1f7527fa36bb6ec0

## Private Keys:
1. bedd71d2be902381d44889162a54901f1ef879e6ab02cad1a5c59689c14a9dfa
1. 723105c310a9762dff19179582d3cbe07c9b251b9a170fc819a680b8bbf73db8
1. d86f0f9114db5383f0a7e6c43a946a9bff2c59b86e949b15647d9a23f0006fc7
1. a4565fc82a00f1d8fc0751881893cbf6654a79746b3c827925ba6b280b5475a2
1. 9d7664b6dcc25958dda9f1538246ba73a72b5f8a1023847ff76f1faa5a2415d2
1. 3bfa90b050f0f22db3ea9d30f0fd2abc89a3f2e16849fc54d5801cdadf457cac
1. d1a34ea258f43d5620db72d797ff54e1eafab4e65946191d604e13565342ace4
1. d924ca07068ed8924344f501adced15dec8c334df35f6efd5fb6e090552a4afc
1. 967247ac0ff9caf7c5b18915e3b7dbc48d9ede7b94cc8ee1f504e6c70c7e7b6c
1. 14168be6d516c1643f8c7a49094907ede1964b8945f0763325d25347c178ba53

## Mnemonic: 
```attract embody tag hope chief just ketchup pizza leopard roof nature enough```

> ⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.
