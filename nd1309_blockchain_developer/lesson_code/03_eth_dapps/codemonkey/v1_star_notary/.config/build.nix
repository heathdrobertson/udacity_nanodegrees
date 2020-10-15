with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "moneky_shop";

  buildInputs = [python37 nodejs];
  shellHook = ''
    npm install truffle @openzeppelin/contracts webpack-dev-server
  '';
}
