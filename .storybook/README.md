# Storybook

We can use [@meepshop/mock-types](./../mock-types) to write the demo page with `storybook`. When you run `storybook`, this will generate a `story.js` file in `.storybook`. If you need to add `props` to the component, you can add `mock.tsx?` in the package folder.

In the page, you can change the mock result with clicking `settings` button.

## Commands

- `index.js`: Run the storybook in the dev mode.
  - NODE_ENV: test
  - STORYBOOK_ENV: dev
- `static.js`: Run the storybook in the static mode.
  - NODE_ENV: test
  - STORYBOOK_ENV: static

## Stories

- icons
- images
- locales
- readme

#### Readme

Use to build the readme in the storybook. If you want to add the new `README.md` of the new package in `storybook`, you need to add the data of the new `README.md` in [stories/readme.js](./stories/readme.js).

```js
const stories = [
  ...
  {
    name: /** scope name */,
    pattern: /** this new story pattern */,
    path: /** the path of the readme in the github */
    source: require(/** path to new README */),
  },
  ...
];
```
