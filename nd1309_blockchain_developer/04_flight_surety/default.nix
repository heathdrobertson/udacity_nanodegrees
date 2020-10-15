with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "neovim";

  buildInputs = [python37 nodejs solc git];
  shellHook = ''
    echo "Hello Dapp World!"
  '';
}
