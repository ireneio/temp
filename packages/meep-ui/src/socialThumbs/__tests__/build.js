import React from 'react';
import { mount } from 'enzyme';

import SocialThumbs from '..';

export default (Context, contextProps, componentProps) => {
  it('build without FB', () => {
    const wrapper = mount(
      <Context {...contextProps}>
        <SocialThumbs {...componentProps} />
      </Context>,
    );

    expect(wrapper.find('SocialThumbs').exists()).toBeTruthy();
    wrapper
      .find('SocialThumbs')
      .instance()
      .componentDidUpdate();
    expect(wrapper.find('SocialThumbs').exists()).toBeTruthy();
  });

  it('build with FB', () => {
    const mockParse = jest.fn();

    global.window.FB = { XFBML: { parse: mockParse } };
    global.window.meepShopStore = { fbSdkIsInstalled: true };

    const wrapper = mount(
      <Context {...contextProps}>
        <SocialThumbs {...componentProps} />
      </Context>,
    );

    expect(mockParse).toHaveBeenCalledTimes(1);
    wrapper
      .find('SocialThumbs')
      .instance()
      .componentDidUpdate();
    expect(mockParse).toHaveBeenCalledTimes(2);
  });
};
