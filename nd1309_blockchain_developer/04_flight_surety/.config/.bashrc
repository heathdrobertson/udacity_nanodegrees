POWGO=$(which powerline-go)

function _update_ps1() {
    PS1="$($POWGO -error $?)"
}

if [ "$TERM" != "linux" ] && [ -f "$POWGO" ]; then
    PROMPT_COMMAND="_update_ps1; $PROMPT_COMMAND"
fi

# Workaround for nix-shell --pure
if [ "$IN_NIX_SHELL" == "pure" ]; then
    if [ -x "$HOME/.nix-profile/bin/powerline-go" ]; then
        alias powerline-go="$HOME/.nix-profile/bin/powerline-go"
    elif [ -x $POWGO ]; then
        alias powerline-go=$POWGO
    fi
fi