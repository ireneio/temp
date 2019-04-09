import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { cartesianProduct } from 'js-combinatorics';
import { areEqual, emptyFunction } from 'fbjs';

import mock from './mock';
import MockTypes from './index';

export default (
  node: React.ReactNode,
  callback:
    | ((wrapper: ReactWrapper<unknown, unknown>) => void | boolean)
    | undefined = emptyFunction.thatReturnsTrue,
) => {
  mock.init();
  mount(<MockTypes>{node}</MockTypes>);

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

      const wrapper = mount(<MockTypes>{node}</MockTypes>);

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
