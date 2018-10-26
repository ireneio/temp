import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import AddressCascader from '..';
import getDefaultAreaList from '../utils/getDefaultAreaList';

const mockFetch = jest.fn().mockImplementation(value => {
  const items = value
    .replace(/\/\/street-name.meepstage.com\/list\//, '')
    .split(/\//);

  if (items.length === 0) return Promise.reject(new Error('no params'));
  if (items.length === 1)
    return Promise.resolve({ json: () => ['台北市', '新北市'] });
  return Promise.resolve({ json: () => ['永和區', '中和區'] });
});

class AddressCascaderWrapper extends React.PureComponent {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string.isRequired),
  };

  static defaultProps = {
    value: undefined,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value,
  };

  render() {
    const { value } = this.state;

    return (
      <AddressCascader
        {...this.props}
        value={value}
        onChange={newValue => this.setState({ value: newValue })}
      />
    );
  }
}

global.fetch = mockFetch;

export default (Context, contextProps, componentProps) => {
  const valueString = componentProps.value?.join('/');
  const mockAreaList = getDefaultAreaList({
    lockedCountry: [],
    transformLocale: value =>
      valueString === 'Taiwan/新北市/永和區' ? value.en_US : value.zh_TW,
  });

  it('use default onChange', () => {
    const wrapper = mount(
      <Context {...contextProps}>
        <AddressCascader {...componentProps} />
      </Context>,
    );

    expect(wrapper.find('AddressCascader').exists()).toBeTruthy();
  });

  it('popup', async () => {
    const wrapper = mount(
      <Context {...contextProps}>
        <AddressCascaderWrapper {...componentProps} />
      </Context>,
    );
    const displayText = wrapper.find('.ant-cascader-picker-label').text();

    wrapper
      .find('AddressCascader')
      .instance()
      .onPopupVisibleChange(true);
    await wrapper
      .find('AddressCascader')
      .instance()
      .checkValueIsInAreaList(mockAreaList, 0);
    wrapper
      .find('AddressCascader')
      .instance()
      .onPopupVisibleChange(false);

    switch (valueString) {
      case '台灣/南海諸島/東沙':
        expect(wrapper.find('.ant-cascader-picker-label').text()).toBe('台灣');
        break;

      case 'Taiwan/新北市/永和區':
        expect(wrapper.find('.ant-cascader-picker-label').text()).toBe('');
        break;

      default:
        expect(wrapper.find('.ant-cascader-picker-label').text()).toBe(
          displayText,
        );
        break;
    }
  });

  it('load data after unmount', async () => {
    const wrapper = mount(
      <Context {...contextProps}>
        <AddressCascaderWrapper {...componentProps} />
      </Context>,
    );
    const { loadData } = wrapper.find('AddressCascader').instance();

    wrapper
      .find('AddressCascader')
      .instance()
      .onPopupVisibleChange(true);
    wrapper.unmount();
    await loadData([mockAreaList[0]]);

    expect(wrapper.find('AddressCascader').exists()).toBeFalsy();
  });

  it('load data with selecting data', async () => {
    const wrapper = mount(
      <Context {...contextProps}>
        <AddressCascaderWrapper {...componentProps} />
      </Context>,
    );

    await wrapper
      .find('AddressCascader')
      .instance()
      .loadData([{ value: '台灣' }]);
    expect(wrapper.find('AddressCascader').exists()).toBeTruthy();
  });
};
