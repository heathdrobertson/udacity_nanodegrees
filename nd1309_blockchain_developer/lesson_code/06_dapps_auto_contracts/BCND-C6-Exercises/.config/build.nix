with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "nd1309";

  buildInputs = [python37 nodejs git];
  shellHook = ''
    npm install --save -g truffle @openzeppelin/contracts web3 webpack webpack-dev-server @truffle/hdwallet-provider
  '';
}
