with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "cryptocoffee";

  buildInputs = [python37 nodejs git];
  shellHook = ''
    npm install --save -g truffle @openzeppelin/contracts webpack webpack-dev-server @truffle/hdwallet-provider
  '';
}
