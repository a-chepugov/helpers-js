#!/usr/bin/env bash
if [[ -z $1 ]]
then
	echo No file specified
	exit 1;
else
	node --allow-natives-syntax --expose-gc $1
fi
