#!/bin/bash
#
# xdg-extract-icons - Extract icons from an X11 window
#
#    Copyright (C) 2020 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program. See <http://www.gnu.org/licenses/gpl.html>
#
# perl snippet by Stéphane Chazelas <https://unix.stackexchange.com/users/22565>
# https://unix.stackexchange.com/a/609751/4919
#------------------------------------------------------------------------------

# Source: https://github.com/MestreLion/xdg-tools

set -Eeuo pipefail  # exit on any error
trap '>&2 echo "error: line $LINENO, status $?: $BASH_COMMAND"' ERR

#------------------------------------------------------------------------------

wid=
name=
format=png
info=0
verbose=0

#------------------------------------------------------------------------------

myname=${0##*/}
mydir=$(dirname "$(readlink -f "$0")")

#------------------------------------------------------------------------------

split_icons() {
	awk -v RS=', | = ' '
		NR == 1         { h  = $1; i++; next }
		NR == i + 1     { x  = $1;        printf "%s = %s", h, x; next }
		NR == i + 2     { s  = x * $1 } { printf ", %s", $1 }
		NR == i + 2 + s { i += s + 2;     printf "\n" }
	'
}

to_pam() {
	perl -0777 -pe '@_=/\d+/g;
	printf "P7\nWIDTH %d\nHEIGHT %d\n", splice@_,0,2;
	printf "DEPTH 4\nMAXVAL 255\nTUPLTYPE RGB_ALPHA\nENDHDR\n";
	$_=pack "N*", @_;
	s/(.)(...)/$2$1/gs'
}

#------------------------------------------------------------------------------

fatal()   { if (($#)); then echo "$myname: error: $@" >&2; fi; exit 1; }
message() { if (($# && verbose)); then printf '%s\n' "$@"; fi; }
argerr()  { printf "%s: %s\n" "$myname" "${1:-error}" >&2; usage 1; }
invalid() { argerr "invalid ${2:-option}: ${1:-}"; }
missing() { argerr "missing ${1:+$1 }argument${2:+ from $2}."; }

usage() {
	if [[ "${1:-}" ]] ; then exec >&2; fi
	cat <<-USAGE
	Usage: $myname [options] [NAME]
	USAGE
	if [[ "${1:-}" ]] ; then
		cat <<- USAGE
		Try '$myname --help' for more information.
		USAGE
		exit 1
	fi
	cat <<-USAGE
	Extract icons from an X11 window
	Options:
	  -h|--help     - show this page.
	  -v|--verbose  - print more details about what is being done.
	  -i|--info     - display icons information instead of extracting
	  -w|--window ID  - ID of the window, in decimal or hexa (0x...).
	                     By default it requests to select one using a
	                     crosshair mouse pointer.
	  -f|--format EXT - Filename extension to determine image format.
	                     Must be a format supported by 'convert'.
	NAME is the prefix for extracted icons filename. It can contain a path.
	If mising or blank, --info is assumed.
	Copyright (C) 2020 Rodrigo Silva (MestreLion) <linux@rodrigosilva.com>
	License: GPLv3 or later. See <http://www.gnu.org/licenses/gpl.html>
	USAGE
	exit 0
}

# Pre-parse for -h|--help, ignoring if after '--'
for arg in "$@"; do
	if [[ "$arg" == '--' ]]; then break; fi
	if [[ "$arg" == "-h" || "$arg" == "--help" ]]; then usage; fi
done
args=()
while (($#)); do
	case "$1" in
	-v|--verbose) verbose=1;;
	-i|--info) info=1;;
	-f|--format) shift; format=${1:-};;
	-w|--window|--window-id|-id) shift; wid=${1:-};;
	--format=*) format=${1#*=};;
	--window-id=*|--window-id=*) wid=${1#*=};;
	--) shift; break;;
	-*) invalid "$1";;
	* ) args+=( "$1" );;
	esac
	shift || break
done
args+=("$@")

case ${#args[@]} in
	0) info=1;;
	1) name=${args[0]}; if [[ -z "$name" ]]; then info=1; fi;;
	*) invalid "${args[1]}" argument;;
esac

if !((info)) && [[ -z "$format" ]]; then missing 'EXT' '--format'; fi


#------------------------------------------------------------------------------

if [[ "$wid" ]]; then
	wid=(-id "$wid")
else
	message "Click to select a window"
	wid=()
fi

i=0
while read -r data; do
	to_pam <<< "$data" |
	if ((info)); then
		identify -
	else
		message "Saving icon #$((++i))"
		convert -set 'filename:w' '%w' - "${name}-%[filename:w].${format#.}"
	fi
done < <(xprop "${wid[@]}" -notype 32c _NET_WM_ICON | split_icons)
