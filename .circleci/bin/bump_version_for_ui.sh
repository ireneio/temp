#!/bin/bash

git checkout develop
git pull upstream develop

BASE_STRING=`cat bin/version`

VERSION="$BASE_STRING-$1"

echo "Version: $VERSION"

git checkout -b $1 develop || git checkout $1

echo $VERSION > bin/version

sed -i '' "s/\(npm i meepshop\/meepshop-ui\)/\1\#"$1"/g" package.json
sed -i '' "s/\(ENV REPO_VERSION=\)\(.*\)/\1"$VERSION"/g" Dockerfile

git add bin/version package.json Dockerfile 
git commit -m "Version bump to $VERSION"
git tag -a -m "Tagging version $VERSION" "v$VERSION"
git push upstream --tags
