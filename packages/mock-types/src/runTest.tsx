// import
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import { cartesianProduct } from 'js-combinatorics';
import { emptyFunction } from 'fbjs';

import mock from './mock';
import MockTypes from './index';

// definition
export default (
  testType: 'meepshop' | 'store' | 'admin',
  node: React.ReactNode,
  callback:
    | ((
        getWrapper: () => ReactWrapper<unknown, unknown>,
        trackingIndex: number[],
      ) => void | boolean)
    | undefined = emptyFunction.thatReturnsTrue,
): void => {
  /* eslint-disable global-require */
  const { resolvers, Provider } = (() => {
    switch (testType) {
      case 'store':
        return {
          resolvers: require('@store/apollo-client-resolvers'),
          Provider: require('./StoreProvider').default,
        };

      case 'admin':
        return {
          resolvers: require('@admin/apollo-client-resolvers'),
          Provider: require('./AdminProvider').default,
        };

      default:
        return {
          resolvers: {
            initializeCache: emptyFunction,
            introspectionQueryResultDataType: [],
            default: {},
          },
          Provider: ({ children }: { children: React.ReactNode }) => children,
        };
    }
  })();
  /* eslint-enable global-require */

  mock.init();
  mount(
    <MockTypes {...resolvers}>
      <Provider>{node}</Provider>
    </MockTypes>,
  );

  if (mock.tracking.length === 0) {
    const wrapper = mount(
      <MockTypes {...resolvers}>
        <Provider>{node}</Provider>
      </MockTypes>,
    );

    if (callback(() => wrapper, []))
      test('exist', () => {
        expect(wrapper.exists()).toBeTruthy();
      });
    return;
  }

  describe.each(
    cartesianProduct(
      ...mock.tracking.map(type =>
        [].constructor
          .apply(null, { length: mock.schemas[type].length })
          .map(Number.call, Number),
      ),
    )
      .toArray()
      // FIXME: @admin/order-ecfit will heap out of memory
      .slice(0, 300),
  )(
    `mock types testing:

${mock.tracking.map(type => `  ${type}: %i`).join('\n')}
`,
    (...trackingIndex) => {
      mock.trackingIndex = trackingIndex;
      let wrapper: ReactWrapper<unknown, unknown>;

      beforeAll(async () => {
        await act(async () => {
          wrapper = mount(
            <MockTypes {...resolvers}>
              <Provider>{node}</Provider>
            </MockTypes>,
          );
        });
        wrapper.update();
      });

      if (callback(() => wrapper, trackingIndex))
        test('exist', () => {
          expect(wrapper.exists()).toBeTruthy();
        });
    },
  );
};
