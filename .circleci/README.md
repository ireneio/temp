# Circleci

## Jobs

- `install`: Install all packages.
- `lint-and-test`: Run `type checking`, `code style checking`, `unit testing`.
- `upload-storybook`: Upload storybook to gcd bucket.
- `upload-images`: Upload the images to gcd bucket.
- `deploy-test-branch`: Deploy image with `test-*` branch.
- `deploy`: Deploy image with `v*` tag.
- `deploy-test`: Deploy image with [meep-github-console](https://github.com/meepshop/meep-github-console).

## Commands

- `CIRCLE_WORKING_DIRECTORY`: Environment variable in `.circleci` is used to show the root path of the repo.

#### `build_docker`

Use to build the docker image.

```sh
yarn lerna exec "../../.circleci/bin/build_docker.sh" --stream --scope <scope name>
// in ci
yarn lerna exec "${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/build_docker.sh" --stream --scope <scope name>
```

#### `deploy_k8s`

Use to deploy docker image to k8s.

```sh
yarn lerna exec "../../.circleci/bin/deploy_k8s.sh" --stream --scope <scope name>
// in ci
yarn lerna exec "${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/deploy_k8s.sh" --stream --scope <scope name>
```

#### `upload_images`

Use to upload the images to the gcd bucket.

```sh
./upload_images.sh stage
// or
./upload_images.sh production
```

#### `checkNeedPublish`

Use to check if the version of the package is equal to `CIRCLE_TAG`. If `CIRCLE_BRANCH` is like `test-*` or `TEST_VERSION` exist, this always return true.

```sh
yarn lerna exec "node ../../.circleci/bin/checkNeedPublish.js" --stream --scope <scope name>
// in ci
yarn lerna exec "node ${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/checkNeedPublish.js" --stream --scope <scope name>
```

#### `getPackageName`

Use to show the package name as `next-admin` or `next-store`.

```sh
yarn lerna exec "node ../../.circleci/bin/getPackageName.js" --stream --scope <scope name>
// in ci
yarn lerna exec "node ${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/getPackageName.js" --stream --scope <scope name>
```

## TODO

- [ ] Remove `prod` in `lint-and-test`
