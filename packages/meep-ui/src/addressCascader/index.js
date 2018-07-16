import React from 'react';
import PropTypes from 'prop-types';
import { Cascader } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import { COUNTRY_TYPE } from 'constants/propTypes';
import removeContextTpyesFromProps from 'utils/removeContextTpyesFromProps';

import getDefaultAreaList from './utils/getDefaultAreaList';

@enhancer
export default class AddressCascader extends React.PureComponent {
  static propTypes = {
    transformLocale: PropTypes.func.isRequired,
    defaultValue: PropTypes.arrayOf(PropTypes.string.isRequired),
    value: PropTypes.arrayOf(PropTypes.string.isRequired),
    lockedCountry: PropTypes.arrayOf(COUNTRY_TYPE.isRequired),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultValue: null,
    value: null,
    lockedCountry: [],
  };

  state = {
    popupVisible: false,
    shouldPopupVisible: false,
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.defaultValue || this.props.value || [],
    areaList: getDefaultAreaList(this.props),
  };

  static getDerivedStateFromProps(props, state) {
    const { value } = props;

    if (value) return { value };

    if (state.value.length !== 0) return { value: [] };

    return null;
  }

  componentDidUpdate() {
    const { shouldPopupVisible, areaList } = this.state;

    if (shouldPopupVisible) this.checkValueIsInAreaList(areaList, 0);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  onPopupVisibleChange = shouldPopupVisible => {
    if (!shouldPopupVisible) {
      return this.setState({
        shouldPopupVisible,
        popupVisible: shouldPopupVisible,
      });
    }

    const { areaList } = this.state;

    return this.setState({ shouldPopupVisible }, () =>
      this.checkValueIsInAreaList(areaList, 0),
    );
  };

  /* eslint-disable no-param-reassign */
  loadData = async selectedItems => {
    // TODO: Consider other countries' select case
    const selectedItem = selectedItems[selectedItems.length - 1];

    if (selectedItem.loading) return;

    const link = `//street-name.meepstage.com/list/${selectedItems
      // FIXME
      .map(({ value }) =>
        encodeURIComponent(value === 'Taiwan' ? '台灣' : value),
      )
      .join('/')}`;

    selectedItem.loading = true;

    // TODO: modified street API
    const data = await fetch(link).then(res => res.json());

    if (this.isUnmounted) return;

    selectedItem.loading = false;
    selectedItem.children = data.map(value => ({
      label: value,
      value,
      isLeaf: selectedItems.length === 2,
    }));

    const { areaList } = this.state;

    this.setState({ areaList: [...areaList] });
  };
  /* eslint-enable no-param-reassign */

  checkValueIsInAreaList = (areaList, index, preAreaItem = []) => {
    const { shouldPopupVisible, value } = this.state;

    if (value.length === 0)
      return this.setState({ popupVisible: shouldPopupVisible });

    if (!areaList && value[index]) return this.loadData(preAreaItem);

    const area = areaList.find(
      ({ value: areaValue }) => areaValue === value[index],
    );

    if (!area && preAreaItem.length !== 0) return this.loadData(preAreaItem);

    if (value[index + 1]) {
      return this.checkValueIsInAreaList(area.children, index + 1, [
        ...preAreaItem,
        area,
      ]);
    }
    return this.setState({ popupVisible: shouldPopupVisible });
  };

  render() {
    const { popupVisible, value, areaList } = this.state;
    const props = removeContextTpyesFromProps(this.props, ['lockedCountry']);

    delete props.lockedCountry;

    return (
      <Cascader
        {...props}
        value={value}
        options={areaList}
        popupVisible={popupVisible}
        loadData={this.loadData}
        onPopupVisibleChange={this.onPopupVisibleChange}
        displayRender={() => value.join(' / ')}
      />
    );
  }
}
