with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "moneky_dapp";

  buildInputs = [python37 nodejs];
  shellHook = ''
    npm install
  '';
}
