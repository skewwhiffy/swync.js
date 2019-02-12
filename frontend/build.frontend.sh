#!/usr/bin/env bash
echo Installing dependencies...
../yarn.sh install

echo Compiling JavaScript, an interpreted language...
../yarn.sh build

echo Embedding static www into Kotlin solution...
mkdir -p ../backend/resources/www
rm -fr ../backend/resources/www
mv dist ../backend/resources/www
