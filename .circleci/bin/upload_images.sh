#!/usr/bin/env bash

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

gsutil cp -r $dir/../../meepshop/images/images/* gs://img.meepcloud.com/assets/$1;
