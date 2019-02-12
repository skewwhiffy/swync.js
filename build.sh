#!/usr/bin/env bash
echo Building frontend
cd frontend
./build.frontend.sh
cd ..

echo Embedding static www into backend solution...
mkdir -p ./backend/resources/www
rm -fr ./backend/resources/www
mv frontend/dist ./backend/resources/www
