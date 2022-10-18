#!/bin/bash

echo "yarn install react app"
yarn install

echo "start react app"
yarn start > /dev/null 2>&1 &

echo "navigate to our e2e folder"
cd e2e

echo "yarn install e2e"
yarn install

echo "run e2e"
./run_tests.sh localhost regression