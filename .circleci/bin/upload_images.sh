#!/usr/bin/env bash

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
imageDir="$dir/../../meepshop/images/images"

for image in $(find $imageDir); do
  if [[ $(file -b $image) =~ 'image' ]]; then
    hash=$(git log -n 1 --pretty=format:%h $image)

    folder=$(dirname -- $image)
    folder="${folder/$imageDir/}"

    filename=$(basename -- $image)
    extension="${filename##*.}"
    filename="${filename%.*}"

    gsFilePath=$folder"/"$filename"_"$hash"."$extension

    gsutil cp $image gs://img.meepcloud.com/assets/$1$gsFilePath
  fi
done
