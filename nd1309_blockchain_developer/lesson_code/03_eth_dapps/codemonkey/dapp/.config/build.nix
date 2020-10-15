with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "moneky_dapp";

  buildInputs = [python37 nodejs];
  shellHook = ''
    npm install body-parser express morgan nodemon truffle web3 ganache-cli ethereumjs-tx
    npm audit fix
    truffle init
  '';
}
