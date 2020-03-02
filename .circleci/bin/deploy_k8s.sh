#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__root="$(cd "$(dirname "${__dir}")" && pwd)"

VERSION=${CIRCLE_TAG:=${TEST_VERSION:=$CIRCLE_BRANCH}}
PACKAGE_NAME=$(node ../../.circleci/bin/getPackageName.js)
ISTIOCTL_VERSION=1.3.6

# check need publish
if [ $(node ../../.circleci/bin/checkNeedPublish.js) != true ]; then
  echo "not need to publish: $VERSION"
  exit
fi

# install kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.14.0/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /tmp/

# install istioctl
curl -sLO https://github.com/istio/istio/releases/download/${ISTIOCTL_VERSION}/istio-${ISTIOCTL_VERSION}-linux.tar.gz
tar zxf istio-${ISTIOCTL_VERSION}-linux.tar.gz
sudo mv istio-${ISTIOCTL_VERSION}/bin/istioctl /usr/local/bin/istioctl
rm istio-${ISTIOCTL_VERSION}-linux.tar.gz
rm -r istio-${ISTIOCTL_VERSION}

curl -s https://api.github.com/repos/kubernetes-sigs/kustomize/releases |\
 grep browser_download |\
 grep linux |\
 grep kustomize_kustomize |\
 head -n1 |\
 cut -d '"' -f 4 |\
 xargs curl -O -L
sudo mv kustomize_kustomize.*_linux_amd64 /usr/local/bin/kustomize
chmod u+x /usr/local/bin/kustomize

# kubernetes config
/tmp/kubectl config set-cluster default-cluster \
       --insecure-skip-tls-verify=true \
       --server=https://$KUBERNETES_PUBLIC_ADDRESS:443

/tmp/kubectl config set-credentials $KUBERNETES_USER \
    --username=$KUBERNETES_USER \
    --password=$KUBERNETES_PASSWD

/tmp/kubectl config set-context default-cluster \
    --cluster=default-cluster \
    --user=$KUBERNETES_USER

/tmp/kubectl config use-context default-cluster

# kustomize deployment
cd ./kustomize/overlays/staging
kustomize edit set image asia.gcr.io/instant-matter-785/${PACKAGE_NAME}=asia.gcr.io/instant-matter-785/${PACKAGE_NAME}:${VERSION}
kustomize build . | istioctl kube-inject -f - | /tmp/kubectl apply -f -

if [[ $CIRCLE_TAG =~ ^v[0-9.]*$ ]]; then
  # release bot
  curl -H 'Content-Type: application/json' -d "{
    \"icon\": \"https://res.cloudinary.com/cakeresume/image/upload/s--Lv6sj1oB--/c_pad,fl_png8,h_200,w_200/v1509504375/pcotebjqdkfuqbvbt4xc.png\",
    \"activity\": \"Release Bot\",
    \"title\": \"$PACKAGE_NAME: $VERSION\"
  }" https://hooks.glip.com/webhook/57916ea2-14b4-488c-8cb9-95efe808cae2
fi
