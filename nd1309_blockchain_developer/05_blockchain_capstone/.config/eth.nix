with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "ethenv";

  buildInputs = [python37 nodejs-12_x node2nix git];
  shellHook = ''
    npm i -g truffle ganache-cli
    npm install
  '';
}

/*
  @openzeppelin/contracts web3 webpack webpack-dev-server @truffle/hdwallet-provider
*/
