// import typescript
import { Resolvers } from 'apollo-client/core/types';

// import
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { cartesianProduct } from 'js-combinatorics';
import { areEqual, emptyFunction } from 'fbjs';

import mock from './mock';
import MockTypes from './index';

// definition
export default (
  node: React.ReactNode,
  {
    default: resolvers,
    initializeCache,
  }: { default: Resolvers; initializeCache: <C>(cache: C) => void },
  callback:
    | ((wrapper: ReactWrapper<unknown, unknown>) => void | boolean)
    | undefined = emptyFunction.thatReturnsTrue,
) => {
  mock.init();
  mount(
    <MockTypes resolvers={resolvers} initializeCache={initializeCache}>
      {node}
    </MockTypes>,
  );

  describe.each(
    cartesianProduct(
      ...mock.tracking.map(type =>
        [].constructor
          .apply(null, { length: mock.schemas[type].length })
          .map(Number.call, Number),
      ),
    ).toArray(),
  )(
    `mock types testing:

${mock.tracking.map(type => `  ${type}: %i`).join('\n')}
`,
    (...trackingIndex) => {
      mock.trackingIndex = trackingIndex;

      const wrapper = mount(
        <MockTypes resolvers={resolvers} initializeCache={initializeCache}>
          {node}
        </MockTypes>,
      );

      beforeAll(async () => {
        await new Promise(resolve => {
          const wait = setInterval(() => {
            if (!areEqual(wrapper.state('mockTypes'), mock.tracking)) return;

            clearInterval(wait);
            resolve();
          }, 5);
        });
        wrapper.update();
      });

      if (callback(wrapper))
        test('exist', () => {
          expect(wrapper.exists()).toBeTruthy();
        });
    },
  );
};
