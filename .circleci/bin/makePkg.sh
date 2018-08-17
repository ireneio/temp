#!/bin/bash

packages=$(ls ./packages)

cat ./package.json >> lerna-package.json
for package in $packages; do
  cat ./packages/$package/package.json >> lerna-package.json
done
