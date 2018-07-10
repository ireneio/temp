#!/bin/bash

function check_prerequisite {
  if ! [ -x "$(command -v docker)" ]; then
    echo "docker doesn't exists in your system"
    exit 1
  fi
}

check_prerequisite

docker build -f $2 -t asia.gcr.io/instant-matter-785/next-store:latest .
docker tag asia.gcr.io/instant-matter-785/next-store:latest \
  asia.gcr.io/instant-matter-785/next-store:$1
docker login -u _json_key -p "$GCLOUD_SERVICE_KEY" https://asia.gcr.io
docker push asia.gcr.io/instant-matter-785/next-store:latest
docker push asia.gcr.io/instant-matter-785/next-store:$1