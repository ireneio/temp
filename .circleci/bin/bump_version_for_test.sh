#!/bin/bash

git checkout develop
git pull upstream develop

BASE_STRING=`cat bin/version`

REPO=$1
BRANCH=$2
VERSION="$BASE_STRING-$3"

echo "Repo: $REPO, Branch: $BRANCH"
echo "Version: $VERSION"

git checkout -b $3 develop || git checkout $3
git pull $REPO $BRANCH || echo "ERROR: somethig wrong"

echo $VERSION > bin/version

sed -i '' "s/\(ENV REPO_VERSION=\)\(.*\)/\1"$VERSION"/g" Dockerfile

git add bin/version Dockerfile
git commit -m "Version bump to $VERSION"
git tag -a -m "Tagging version $VERSION" "v$VERSION" || git tag -a -m "Tagging version $VERSION" "v$VERSION-merge"
git push upstream --tags
