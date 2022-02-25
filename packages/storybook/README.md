# Storybook

Before `new schema` can work, you can use `storybook` to write the new component with [@meepshop/mock-types](../mock-types). In this mode, you can mock the result from `apollo-client`.

## Usage

1. Run `yarn storybook:pre` once.
2. Use `yarn storybook generate <packages...>` to generate the package stories.
3. Run `yarn storybook dev <workspace>` to host `storybook`.

 (optional) If you want to give some mock props to package stories, you can use `mock.ts` as `mock props` or using `mock.ts`, `mock folder` as `mock component`.
