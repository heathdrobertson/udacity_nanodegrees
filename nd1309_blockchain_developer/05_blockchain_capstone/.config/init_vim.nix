{pkgs}:
{
  config = ''
    " NERDTree Settings
    autocmd vimenter * NERDTree
    " Toggle
    map <C-n> :NERDTreeToggle<CR>
    :imap <C-j> <Esc>
    " enable line numbers
    let NERDTreeShowLineNumbers=1

    " Autoformat Settings
    noremap <F3> :Autoformat<CR>

    " git Settings
    autocmd Filetype gitcommit setlocal spell textwidth=72

    " Haskell
    " Disable haskell-vim omnifunc
    let g:haskellmode_completion_ghc=0
    autocmd FileType haskell setlocal omnifunc=necoghc#omnifunc
    " YCM integration
    let g:ycm_semantic_triggers={'haskell' : ['.']}
    "Show detailed information (type) of symbols.
    let g:necoghc_enable_detailed_browse=1

    " Nodejs"
    let g:loaded_node_provider=1
    let g:node_host_prog='/nix/store/98fqirs1dkvm240kn72jj1s2ifd5xx3y-nodejs-10.16.3/bin/neovim-node-host'

    " indents files according to filetype
    filetype plugin indent on

    " enable syntax highlighting
    syntax enable

    " show line numbers
    set number

    " set tabs to have 4 spaces
    set ts=4

    " indent when moving to the next line while writing code
    set autoindent

    " expand tabs into spaces
    set expandtab

    " when using the >> or << commands, shift lines by 4 spaces
    set shiftwidth=4

    " show the matching part of the pair for [] {} and ()
    set showmatch

    " enable all Python syntax highlighting features
    let python_highlight_all=1

    " Enable JsBeautify
    autocmd FileType javascript noremap <buffer>  <c-f> :call JsBeautify()<cr>
    autocmd FileType json noremap <buffer> <c-f> :call JsonBeautify()<cr>
    autocmd FileType jsx noremap <buffer> <c-f> :call JsxBeautify()<cr>
    autocmd FileType html noremap <buffer> <c-f> :call HtmlBeautify()<cr>
    autocmd FileType css noremap <buffer> <c-f> :call CSSBeautify()<cr>

    " Vim-Airline
    " List of themes here:
    " $HOME/.local/share/nvim/plugged/vim-airline-themes/doc/airline-themes.txt
    let g:airline#extensions#tabline#enabled=1
    let g:airline_theme='laederon' " 'papercolor'

    if !exists('g:airline_symbols')
      let g:airline_symbols={}
    endif
    let g:airline_symbols.space="\ua0"

    " unicode symbols
    let g:airline_left_sep='»'
    let g:airline_left_sep=''
    let g:airline_right_sep='«'
    let g:airline_right_sep=''
    let g:airline_symbols.crypt='🔒'
    let g:airline_symbols.linenr='☰'
    let g:airline_symbols.linenr='␊'
    let g:airline_symbols.linenr='␤'
    let g:airline_symbols.linenr='¶'
    let g:airline_symbols.maxlinenr=' '
    let g:airline_symbols.maxlinenr='㏑'
    let g:airline_symbols.branch='⎇'
    let g:airline_symbols.paste='ρ'
    let g:airline_symbols.paste='Þ'
    let g:airline_symbols.paste='∥'
    let g:airline_symbols.spell='Ꞩ'
    let g:airline_symbols.notexists='∄'
    let g:airline_symbols.whitespace='Ξ'

    " powerline symbols
    let g:airline_left_sep=''
    let g:airline_left_alt_sep=''
    let g:airline_right_sep=''
    let g:airline_right_alt_sep=''
    let g:airline_symbols.branch=''
    let g:airline_symbols.readonly=''
    let g:airline_symbols.linenr='☰'
    let g:airline_symbols.maxlinenr=''

    " clipboard
    set clipboard+=unnamedplus

    " Set Spell
    :nmap <F8> :setlocal spell spelllang=en_us<CR>
    :nmap <F9> :set nospell<CR>
    :nmap <F7> :echo 'Hi Heath'<CR>

    " set Vertical Column color at 80 chars
    set colorcolumn=89

    " show a visual line under the cursor's current line
    highlight Cursor guifg=white guibg=black
    highlight iCursor guifg=white guibg=steelblue
    set guicursor=n-v-c:block-Cursor
    set guicursor+=i:ver100-iCursor
    set guicursor+=n-v-c:blinkon0
    set guicursor+=i:blinkwait10
    set cursorline
    :hi CursorLine cterm=NONE ctermbg=25 guibg=darkblue ctermfg=4 guifg=white  
    :hi CursorColumn cterm=NONE ctermfg=4 ctermbg=25  guibg=darkblue guifg=white
    :nnoremap <Leader>c :set cursorline! cursorcolumn!<CR>

    " gitgutter
    let g:gitgutter_terminal_reports_focus=1
    let g:gitgutter_enabled=1
    let g:gitgutter_signs=1
  '';
}
