#!/usr/bin/env bash
echo Installing dependencies...
../yarn.sh install

echo Compiling JavaScript, an interpreted language...
../yarn.sh build

