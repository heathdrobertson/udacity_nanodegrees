with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "cryptocoffee";

  buildInputs = [python37 nodejs git];
  shellHook = ''
    echo "Hello Dapp World!"
  '';
}
