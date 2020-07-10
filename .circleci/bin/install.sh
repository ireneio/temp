#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

# install kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/$KUBECTL_VERSION/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /tmp/

# install istioctl
curl -sLO https://github.com/istio/istio/releases/download/$ISTIOCTL_VERSION/istio-$ISTIOCTL_VERSION-linux.tar.gz
tar zxf istio-$ISTIOCTL_VERSION-linux.tar.gz
sudo mv istio-$ISTIOCTL_VERSION/bin/istioctl /usr/local/bin/istioctl
rm istio-$ISTIOCTL_VERSION-linux.tar.gz
rm -r istio-$ISTIOCTL_VERSION

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
