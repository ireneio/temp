#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

# install kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/$KUBECTL_VERSION/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /tmp/

curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash
sudo mv kustomize /usr/local/bin/kustomize
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
