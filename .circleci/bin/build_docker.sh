#!/bin/bash

VERSION=${CIRCLE_TAG:=${TEST_VERSION:=$CIRCLE_BRANCH}}

# check need publish
if [ $(node ../../.circleci/bin/checkNeedPublish.js) != true ]; then
  echo "not need to publish: $VERSION"
  exit
fi

# check docker
if ! [ -x "$(command -v docker)" ]; then
  echo "docker doesn't exists in your system"
  exit 1
fi

# replace Dockerfile version with git commit sha
sed -i "s/{{ build.tag }}/$VERSION/" "$(pwd)/Dockerfile"

PACKAGE_NAME=$(node ../../.circleci/bin/getPackageName.js)

docker build -t asia.gcr.io/instant-matter-785/$PACKAGE_NAME:latest -f $(pwd)/Dockerfile ../..
docker tag asia.gcr.io/instant-matter-785/$PACKAGE_NAME:latest \
  asia.gcr.io/instant-matter-785/$PACKAGE_NAME:$VERSION
docker login -u _json_key -p "$GCLOUD_SERVICE_KEY" https://asia.gcr.io
docker push asia.gcr.io/instant-matter-785/$PACKAGE_NAME:latest
docker push asia.gcr.io/instant-matter-785/$PACKAGE_NAME:$VERSION
