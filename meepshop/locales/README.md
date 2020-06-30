# @meepshop/locales

This package is used to manage the locales files.

## Usage

`repoPath` should be the locales folder. The default folder is [here](./locales). You can use `locales -h` to find the comands.

## Add a new locale

1. Add the new locale to [here](./src/constants), and the value of the new locale must be a google translate url.
2. Run `locales update`

## Add a new locale file

1. Create a default project, you can see [here](../../#how-to-write-a-new-package). If the package exist, you can skip this step.
2. Run `locale create -p <package name>`.
