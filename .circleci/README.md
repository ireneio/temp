# Circleci

- `CIRCLE_WORKING_DIRECTORY`: Environment variable in `.circleci` is used to show the root path of the repo.

## `build_docker`

Use to build the docker image.

```sh
yarn lerna exec "../../.circleci/bin/build_docker.sh" --stream --scope <scope name>
// in ci
yarn lerna exec "${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/build_docker.sh" --stream --scope <scope name>
```

## `deploy_k8s`

Use to deploy docker image to k8s.

```sh
yarn lerna exec "../../.circleci/bin/deploy_k8s.sh" --stream --scope <scope name>
// in ci
yarn lerna exec "${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/deploy_k8s.sh" --stream --scope <scope name>
```

## `checkNeedPublish`

Use to check if the version of the package is equal to `CIRCLE_TAG`. If `CIRCLE_BRANCH` is like `test-*` or `TEST_VERSION` exist, this always return true.

```sh
yarn lerna exec "node ../../.circleci/bin/checkNeedPublish.js" --stream --scope <scope name>
// in ci
yarn lerna exec "node ${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/checkNeedPublish.js" --stream --scope <scope name>
```

## `getPackageName`

Use to show the package name as `next-admin` or `next-store`.

```sh
yarn lerna exec "node ../../.circleci/bin/getPackageName.js" --stream --scope <scope name>
// in ci
yarn lerna exec "node ${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/getPackageName.js" --stream --scope <scope name>
```

## `localeNotifier`

Use to check the locale files and send the notification to `glip`.

- Check the locale files

  ```sh
  yarn lerna exec "node ../../.circleci/bin/localeNotifier.js" --stream --scope <scope name>
  // in ci
  yarn lerna exec "node ${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/localeNotifier.js" --stream --scope <scope name>
  ```

- Send the notification

  ```sh
  yarn lerna exec "node ../../.circleci/bin/localeNotifier.js --send" --stream --scope <scope name>
  // in ci
  yarn lerna exec "node ${CIRCLE_WORKING_DIRECTORY}/.circleci/bin/localeNotifier.js --send" --stream --scope <scope name>
  ```
