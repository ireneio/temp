#!/bin/bash

BASE_STRING=`cat bin/version`
BASE_LIST=(`echo $BASE_STRING | tr '.' ' '`)
echo "Current version: $BASE_STRING"

V_MAJOR=${BASE_LIST[0]}
V_MINOR=${BASE_LIST[1]}
V_PATCH=${BASE_LIST[2]}

V_PATCH=$((V_PATCH + 1))
SUGGESTED_VERSION="$V_MAJOR.$V_MINOR.$V_PATCH"

read -p "Enter a version number [$SUGGESTED_VERSION]" INPUT_STRING
if [[ "$INPUT_STRING" = "" ]]; then
	INPUT_STRING=$SUGGESTED_VERSION
fi

echo "Set new version to be $INPUT_STRING"

echo $INPUT_STRING > bin/version

sed -i '' "s/\(ENV REPO_VERSION=\)\(.*\)/\1"$INPUT_STRING"/g" Dockerfile

git add bin/version Dockerfile
git commit -m "Version bump to $INPUT_STRING"
git tag -a -m "Tagging version $INPUT_STRING" "v$INPUT_STRING"
git push upstream --tags
