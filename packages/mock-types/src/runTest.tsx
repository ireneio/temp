// import
import events from 'events';

import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import { cartesianProduct } from 'js-combinatorics';
import { emptyFunction } from 'fbjs';

import mock from './mock';

// definition
const mockEvents = new events.EventEmitter();
const mockLog = jest.fn();
const log = (...messages: string[]): void => {
  if (
    /Warning: An update to [\w%]+ inside a test was not wrapped in act/.test(
      messages.join(''),
    ) ||
    // FIXME: enzyme bug
    /Warning: componentWillMount has been renamed/.test(messages.join('')) ||
    /Warning: componentWillReceiveProps has been renamed/.test(
      messages.join(''),
    )
  )
    return;

  mockLog(...messages);
};

window.events = {
  dispatchEvent: (event: Event) => mockEvents.emit(event.toString()),
  addEventListener: mockEvents.on,
  removeEventListener: mockEvents.off,
};
global.console.error = log;
global.console.warn = log;

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
  const Provider = {
    /* eslint-disable global-require */
    meepshop: require('./MeepshopProvider').default,
    store: require('./StoreProvider').default,
    admin: require('./AdminProvider').default,
    /* eslint-enable global-require */
  }[testType];
  const render = (): ReactWrapper<unknown, unknown> =>
    mount(
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore FIXME can not give next props in the testing mode
      <Provider>{node}</Provider>,
    );

  mock.init();
  render();

  if (mock.tracking.length === 0) {
    const wrapper = render();

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
      // FIXME: @admin/page-manager will heap out of memory
      .slice(0, 80),
  )(
    `mock types testing:

${mock.tracking.map(type => `  ${type}: %i`).join('\n')}
`,
    (...trackingIndex) => {
      mock.trackingIndex = trackingIndex;
      let wrapper: ReactWrapper<unknown, unknown>;

      beforeAll(async () => {
        await act(async () => {
          wrapper = render();
        });
        wrapper.update();
      });

      if (callback(() => wrapper, trackingIndex))
        test('exist', () => {
          expect(wrapper.exists()).toBeTruthy();
        });

      test('no error and warn', () => {
        expect(mockLog).not.toHaveBeenCalled();
      });
    },
  );
};
