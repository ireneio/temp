#!/bin/bash

packages=$(ls ./packages)

for package in $packages; do
  cat ./packages/$package/package.json >> lerna-package.json
done
