import React from 'react';
import { mount } from 'enzyme';

import AddressCascader from '..';

export default (Context, contextProps, componentProps) => {
  it('set value', () => {
    const Root = props => (
      <Context {...contextProps}>
        <AddressCascader {...props} />
      </Context>
    );
    const wrapper = mount(<Root {...componentProps} />);

    wrapper.setProps({ value: ['台灣', '新北市', '永和區'] });
    expect(wrapper.find('.ant-cascader-picker-label').text()).toBe(
      '台灣 / 新北市 / 永和區',
    );

    wrapper.setProps({ value: null });
    expect(wrapper.find('.ant-cascader-picker-label').text()).toBe('');
  });
};
