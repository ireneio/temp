# Meep UI

## How to use
Before each command, run `build:tool` in the root to build tool.
```sh
$ npm run lerna -- run build:tool --scope @meepshop/meep-ui --stream
```

- `storybook`: Run storybook for development.
- `storybook:docs`: Build docs with storybook.

## How tool parse comment
Use `comment` to build data with each `module` and `propTypes`.

Example: `/** [type name or event name] | [parse rule] data1, data2, data */`

### Type name
Use in `propTypes`, each `PropTypes` will determine the data of those props, and `type name` will determine those data added to their parent component`s data tree below this `type name`.

Most of data from `api server` is `null`. As a result, If `propTypes` is required, it will add `null` to data, not `undefined`.

| Name | Use for |
|------|---------|
| `props` | Add to the root of the parent data. |
| `ignore` | Not handle `propTypes` below this `type name`. Use for data which is needed as `undefined` or is not needed to be test. |

##### Example:
```js
class example extends React.PureComponent {
  static propTypes = {
    /** props */
    data1: PropTypes.number.isRequired,
    data2: PropTypes.number.isRequired,

    /** parentData */
    data3: PropTypes.number.isRequired,

    /** a.b */
    data4: PropTypes.number.isRequired,
  };
  ...
}

/*
If parent data like: `{ parentData: {}, a: { b: {} } }`,
it will be added like `{ data1: testData, data2: testData, parentData: { data3: testData }, a: { b: { data4: testData } } }`.
*/
```

### Event name
Use for testing `method`. Use test template to test this `event`.

#### Name list
- resize

### Parse rule
Determin the data how to parse.

| Rule name | Use for |
|-----------|---------|
| `test` | Make a array to test. |
| `testRandom` | Like `test`, but it will random only one data to `test framework`. |
| `testJSON` | | Use `json.parse` to make a test array. |

##### How data are used
- For `propType`, data are used to build data tree.

- For `method`, data are use to make `mockData` for something like `ref`. If need to mock data with `component props`, use like `"data": "/<ComponentProps>.width + 100/"`. Each element in test data array will call event. As a result, it can test like `resize`.

  ```js
  /** 
   * resize | testJSON [{
   *   "componentRef": {
   *     "current": {
   *       "offsetWidth": 99,
   *       "offsetHeight": 0
   *     }
   *   }
   * }, {
   *   "componentRef": {
   *     "current": {
   *       "offsetWidth": "/<ComponentProps>.width/",
   *       "offsetHeight": "/<ComponentProps>.height/"
   *     }
   *   }
   * }]
   */

  /*
  This will call resize twice with mock `componentRef`.
  */
  ```

## Custom story
Add `__story__/index.js` in module to make custom story. Test data will be given like `props`.

```js
import React from 'react';
import { Button } from 'antd';

import Component from '..';

export default props => (
  <Component {...props}>
    <Button>link</Button>
  </Component>
);
```

## Custom test
Add custom test files in `__tests__`. It can add multiple files to `__tests__` for different testing. Those files will be called as function and `Context`, `contextProps`, `componentProps` will be passed as argument.

- `Context`: Use for make `enhancer` can work.
- `contextProps`: The data `Context` need to use.
- `componentProps`: The test data of this component.

```js
import React from 'react';
import { mount } from 'enzyme';
import URL from 'url-parse';

import Link from '..';

export default (Context, contextProps, componentProps) => {
  it('click link', () => {
    const goTo = jest.fn((...argu) => contextProps.goTo(...argu));
    const { href, target } = componentProps;
    const { host } = new URL(href);
    const wrapper = mount(
      <Context {...contextProps} goTo={goTo}>
        <Link {...componentProps}>
          <button />
        </Link>
      </Context>,
    );  

    wrapper.find('Link').simulate('click');

    if (href && host === '' && target !== '_blank') {
      expect(goTo).toHaveBeenCalledTimes(1);
    } else {
      expect(goTo).toHaveBeenCalledTimes(0);
    }   
  }); 
};

```

### Custom test data
Add `__tests__/testData.js` to add custom test data.
