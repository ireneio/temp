#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

VERSION=${CIRCLE_TAG:=${TEST_VERSION:=$CIRCLE_BRANCH}}
PACKAGE_NAME=$(node ../../.circleci/bin/getPackageName.js)

# check need publish
if [ $(node ../../.circleci/bin/checkNeedPublish.js) != true ]; then
  echo "not need to publish: $VERSION"
  exit
fi

# kustomize deployment
cd ./kustomize/overlays/staging
kustomize edit set image asia.gcr.io/instant-matter-785/${PACKAGE_NAME}=asia.gcr.io/instant-matter-785/${PACKAGE_NAME}:${VERSION}
kustomize build . | /tmp/kubectl apply -f -

if [[ $CIRCLE_TAG =~ ^v[0-9.]*$ ]]; then
  # release bot
  curl -H 'Content-Type: application/json' -d "{
    \"icon\": \"https://res.cloudinary.com/cakeresume/image/upload/s--Lv6sj1oB--/c_pad,fl_png8,h_200,w_200/v1509504375/pcotebjqdkfuqbvbt4xc.png\",
    \"activity\": \"Release Bot\",
    \"title\": \"$PACKAGE_NAME: $VERSION\"
  }" https://hooks.glip.com/webhook/57916ea2-14b4-488c-8cb9-95efe808cae2

 curl -X POST https://zulip.meepshop.com/api/v1/messages \
    -u "${ZULIP_BOT_EMAIL}:${ZULIP_BOT_API_KEY}" \
    -d "type=stream" \
    -d "to=dev/deployment" \
    -d "topic=[stage] frontEnd" \
    -d "content=🟢 Release \
    $PACKAGE_NAME: $VERSION
    "
fi
