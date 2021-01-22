# Storybook

This package is used to run `storybook` with [@meepshop/mock-types](../mock-types).

## Usage

1. Run `yarn storybook:pre` once.
2. Run `yarn storybook dev <workspace>` to host `storybook`.
3. Use `yarn storybook generate <packages...>` to generate the package stories.

If you want to give some mock props to package stories, you can use `mock.ts` as `mock props` or using `mock.ts`, `mock folder` as `mock component`.
