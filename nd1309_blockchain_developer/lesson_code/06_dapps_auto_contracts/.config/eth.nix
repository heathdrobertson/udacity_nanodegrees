with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "nd1309";

  buildInputs = [python37 nodejs git];
  shellHook = ''
    echo "Hello Dapp World!"
  '';
}
