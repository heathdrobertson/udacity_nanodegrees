with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "ethereum_dap";

  buildInputs = [python37 nodejs];
  shellHook = ''
    npm run dev 
  '';
}
