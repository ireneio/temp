import React from 'react';
import { mount } from 'enzyme';
import { invariant } from 'fbjs';

import contextProvider, { contextPropsKey } from '../utils/contextProvider';

const { enhancer, removeContextProps } = contextProvider(
  Object.keys(contextPropsKey),
);

@enhancer
class TestRemove extends React.Component {
  render() {
    const props = removeContextProps(this.props);

    invariant(
      Object.keys(props).length === 0,
      `\`removeContextProps\` does not clean all: [${Object.keys(props).join(
        ', ',
      )}]`,
    );

    return null;
  }
}

// eslint-disable-next-line react/no-multi-comp
@enhancer
class TestGiveContextPropsToChild extends React.Component {
  render() {
    return <TestRemove {...this.props} />;
  }
}

export default (Context, contextProps) => {
  it('Remove context props is working and clean all context props', () => {
    expect(() => {
      mount(
        <Context {...contextProps}>
          <TestRemove />
        </Context>,
      );
    }).not.toThrowError('`removeContextProps` does not clean all');
  });

  it('Throw error when give context props to children with ...props', () => {
    expect(() => {
      mount(
        <Context {...contextProps}>
          <TestGiveContextPropsToChild />
        </Context>,
      );
    }).toThrowError(
      'Warning: `locale` is in the props of `Enhancer([locale,location,func,storeSetting])(TestRemove)`. Use `removeContextProps(props)` if using `...props` in the parent Component. If this is not the `locale` in the `context props`, rename it.',
    );
  });
};
