import React from 'react';
import { mount } from 'enzyme';

import FacebookWall from '..';

export default (Context, contextProps, componentProps) => {
  it('build without FB', () => {
    const wrapper = mount(
      <Context {...contextProps}>
        <FacebookWall {...componentProps} />
      </Context>,
    );

    expect(wrapper.find('FacebookWall').exists()).toBeTruthy();
    wrapper
      .find('FacebookWall')
      .instance()
      .componentDidUpdate();
    expect(wrapper.find('FacebookWall').exists()).toBeTruthy();
  });

  it('build with FB', () => {
    const mockParse = jest.fn();
    global.window.FB = { XFBML: { parse: mockParse } };
    global.window.meepShopStore = { fbSdkIsInstalled: true };

    const wrapper = mount(
      <Context {...contextProps}>
        <FacebookWall {...componentProps} />
      </Context>,
    );

    expect(mockParse).toHaveBeenCalledTimes(1);
    wrapper
      .find('FacebookWall')
      .instance()
      .componentDidUpdate();
    expect(mockParse).toHaveBeenCalledTimes(2);
  });
};
