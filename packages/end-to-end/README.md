# @meepshop/end-to-end

This package is used to run `end-to-end` testing.

## How to use

1. Build a pord server.
2. Run `yarn test`.

## How to make a new test

1. Download [testcafe studio](https://www.devexpress.com/products/testcafestudio/?utm_source=github.com&utm_medium=referral&utm_campaign=tc-gh-ide).
2. Build a prod server.
3. Open `testcafe studio` and load the [./src](./src) folder in `testcafe`.
4. Add the new fixture with task name, like: `T1111`.
5. Record a new test.

See [here](https://github.com/DevExpress/testcafe#ide-for-end-to-end-web-testing) to lerna more detail. If you want to test with the remote browser, you can see [here](https://docs.devexpress.com/TestCafeStudio/400177/guides/run-tests#run-tests-on-remote-computers-and-mobile-devices).

## How this package work

You can see [here](./src/index.ts). This package use `git diff` to find the different files in `@meepshop/end-to-end`. If this package can not find new files, this will run the latest ten files. After finding the files, this will open a prod server and run `testcafe --fixture` with the files.
