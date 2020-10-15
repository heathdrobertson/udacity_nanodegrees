with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "cryptostar";

  buildInputs = [python37 nodejs];
  shellHook = ''
    npm install
  '';
}
