#!/bin/bash

cat ./package.json >> lerna-package.json
for package in $(ls ./packages); do
  cat ./packages/$package/package.json >> lerna-package.json
done
for patch in $(ls ./patches); do
  cat ./patches/$patch >> lerna-package.json
done
