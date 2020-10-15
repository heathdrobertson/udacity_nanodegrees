with import <nixpkgs> {};

# with pkgs;

stdenv.mkDerivation {
  name = "Express API";

  buildInputs = [python37 nodejs];
  shellHook = ''
    npm install body-parser express morgan nodemon
  '';
}
