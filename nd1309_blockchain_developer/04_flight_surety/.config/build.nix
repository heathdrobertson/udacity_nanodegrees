with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "fltsurety";

  buildInputs = [python37 solc nodejs git];
  shellHook = ''
    npm install -g --save truffle
    npm install -g create-react-app
  '';
}

/*
  @openzeppelin/contracts web3 webpack webpack-dev-server @truffle/hdwallet-provider
*/
