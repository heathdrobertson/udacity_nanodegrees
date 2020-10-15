# docker run --rm --volumes-from=nix -it -v $(pwd):/app -w /app -p 3000:3000 nixos/nix nix-shell /app/.config/default.nix
# ToiletHill.io for more information on what the above ```docker run``` command does.

with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "nd1309";

  buildInputs = [python37 nodejs];
  shellHook = ''
    npm install crypto-js bitcoinjs-message bitcoinjs-lib
  '';
}
