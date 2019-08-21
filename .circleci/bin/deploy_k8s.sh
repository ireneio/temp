#!/bin/bash

VERSION=${CIRCLE_TAG:=${TEST_VERSION:=$CIRCLE_BRANCH}}
PACKAGE_NAME=$(node ../../.circleci/bin/getPackageName.js)

# check need publish
if [ $(node ../../.circleci/bin/checkNeedPublish.js) != true ]; then
  echo "not need to publish: $VERSION"
  exit
fi

# install kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.7.3/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /tmp/

# generate kubernetes config file
/tmp/kubectl config set-cluster default-cluster \
       --insecure-skip-tls-verify=true \
       --server=https://$KUBERNETES_PUBLIC_ADDRESS:443 \
       --kubeconfig=/tmp/kubeconfig
/tmp/kubectl config set-credentials $KUBERNETES_USER \
    --username=$KUBERNETES_USER \
    --password=$KUBERNETES_PASSWD \
    --kubeconfig=/tmp/kubeconfig
/tmp/kubectl config set-context default-cluster \
    --cluster=default-cluster \
    --user=$KUBERNETES_USER \
    --kubeconfig=/tmp/kubeconfig
/tmp/kubectl config use-context default-cluster --kubeconfig=/tmp/kubeconfig

# replace deploy.yml version with git commit sha
sed -i "s/{{ build.tag }}/$VERSION/" ./k8s_config/deploy.yaml

# kubernetes deploy
/tmp/kubectl apply --force -f ./k8s_config/deploy.yaml --kubeconfig=/tmp/kubeconfig
/tmp/kubectl apply --force -f ./k8s_config/svc.yaml --kubeconfig=/tmp/kubeconfig
/tmp/kubectl apply --force -f ./k8s_config/cm_stage.yaml --kubeconfig=/tmp/kubeconfig

if [[ $CIRCLE_TAG =~ ^v[0-9.]*$ ]]; then
  # release bot
  curl -H 'Content-Type: application/json' -d "{
    \"icon\": \"https://res.cloudinary.com/cakeresume/image/upload/s--Lv6sj1oB--/c_pad,fl_png8,h_200,w_200/v1509504375/pcotebjqdkfuqbvbt4xc.png\",
    \"activity\": \"release bot\",
    \"title\": \"$PACKAGE_NAME: $VERSION\"
  }" https://hooks.glip.com/webhook/57916ea2-14b4-488c-8cb9-95efe808cae2

  # locale bot
  curl -H 'Content-Type: application/json' -d "{
    \"icon\": \"https://res.cloudinary.com/cakeresume/image/upload/s--Lv6sj1oB--/c_pad,fl_png8,h_200,w_200/v1509504375/pcotebjqdkfuqbvbt4xc.png\",
    \"activity\": \"locale bot\",
    \"title\": \"$PACKAGE_NAME: $VERSION\"
  }" https://hooks.glip.com/webhook/a86a81ec-fbd0-4a7c-8f34-2135d18d1309
  node ../../.circleci/bin/localeNotifier.js --send
fi
