let 
  init_vim = import ./init_vim.nix rec { pkgs = pkgs; };
in

with import <nixpkgs> {
  config = {
    packageOverrides = pkgs : with pkgs; {
      myNeovim = neovim.override {
        configure = {

          customRC = init_vim.config;

          plug.plugins = with pkgs.vimPlugins; [
            nerdtree
            nerdtree-git-plugin
            vim-airline
            vim-airline-themes
            vim-autoformat
            auto-pairs
            youcompleteme
            vim-gitgutter
            haskell-vim
            neco-ghc
            rust-vim
            auto-pairs
            vim-flake8
            vim-yapf
            vim-surround
            vim-jsbeautify
            typescript-vim
            vim-nix
            vim-solidity
          ];

        }; 
      };
    };
  };
};

let
  pythonEnv = python37.withPackages (ps: [
    ps.setuptools
    ps.pip
    ps.pyyaml
    ps.pynvim
    ps.msgpack
    ps.pyopenssl
  ]);
in
stdenv.mkDerivation rec {
  name = "neovim";

  buildInputs = [
    git
    libcap
    go
    gcc
    rustc
    cargo
    nodejs
    ghc
    cabal-install
    solc
    pythonEnv
    powerline-fonts
    powerline-go
    ruby
    xsel
    xclip
    locale
    myNeovim
  ];
  shellHook = ''
    export LANG=UTF-8
    export LANG=en_US.UTF-8

    # Set DISPALY env for xclip
    export DISPLAY=:0
    npm i -g neovim
    cp .config/.bashrc /root/.bashrc
    source /root/.bashrc
  '';
}