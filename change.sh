#!/bin/sh
 
git filter-branch --env-filter '
 
an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"
cn="$GIT_COMMITTER_NAME"
cm="$GIT_COMMITTER_EMAIL"
 
if [ "$GIT_COMMITTER_EMAIL" = "[wb-fw665529@antfin.com]" ]
then
    cn="[fuwei]"
    cm="[454575238@qq.com]"
fi
if [ "$GIT_AUTHOR_EMAIL" = "[wb-fw665529@antfin.com]" ]
then
    an="[fuwei]"
    am="[454575238@qq.com]"
fi
 
export GIT_AUTHOR_NAME="$an"
export GIT_AUTHOR_EMAIL="$am"
export GIT_COMMITTER_NAME="$cn"
export GIT_COMMITTER_EMAIL="$cm"


'