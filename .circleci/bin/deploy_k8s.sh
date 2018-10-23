#!/bin/bash

VERSION=${CIRCLE_TAG:=${TEST_VERSION:=$CIRCLE_BRANCH}}

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
