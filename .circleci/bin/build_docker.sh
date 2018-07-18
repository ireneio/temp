#!/bin/bash

# check need publish
if [ $(node ../../.circleci/bin/checkNeedPublish.js) != true ]; then
  echo "not need to publish: ${1}"
  exit
fi

# check docker
if ! [ -x "$(command -v docker)" ]; then
  echo "docker doesn't exists in your system"
  exit 1
fi

dependencies=$(node ../../.circleci/bin/addOtherDependencies.js)

# replace Dockerfile version with git commit sha
sed -i "s/{{ build.tag }}/${1}/" "$(pwd)/Dockerfile"
# replace Dockerfile dependencies
sed -i "s/{{ dependencies }}/${dependencies}/" "$(pwd)/Dockerfile"

docker build -t asia.gcr.io/instant-matter-785/next-store:latest .
docker tag asia.gcr.io/instant-matter-785/next-store:latest \
  asia.gcr.io/instant-matter-785/next-store:$1
docker login -u _json_key -p "$GCLOUD_SERVICE_KEY" https://asia.gcr.io
docker push asia.gcr.io/instant-matter-785/next-store:latest
docker push asia.gcr.io/instant-matter-785/next-store:$1
