with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "ethenv";

  buildInputs = [python37 nodejs git];
  shellHook = ''
    echo "Hello Dapp World!"
  '';
}
