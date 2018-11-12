import React from 'react';
import { mount } from 'enzyme';
import URL from 'url-parse';

import Link from '..';

export default (Context, contextProps, componentProps) => {
  const { href, target } = componentProps;

  it(`click ${href} with target = ${target}`, () => {
    const goTo = jest.fn((...argu) => contextProps.goTo(...argu));
    const { host } = new URL(
      /(^#)|(^\/)|(^http)/.test(href) ? href : `//${href}`,
    );
    const wrapper = mount(
      <Context {...contextProps} goTo={goTo}>
        <Link {...componentProps}>
          <button type="button" />
        </Link>
      </Context>,
    );

    wrapper.find('Link').simulate('click');

    if (href && host === contextProps.location.host && target !== '_blank')
      expect(goTo).toHaveBeenCalledTimes(1);
    else expect(goTo).toHaveBeenCalledTimes(0);
  });
};
