import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Input } from 'antd';
import SearchIcon from 'react-icons/lib/md/search';

import { enhancer } from 'layout';

import { FONTSIZE_TYPE } from './constants';
import * as styles from './styles/searchBar';

@enhancer
@radium
export default class SearchBar extends React.Component {
  static propTypes = {
    adTrack: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    fontSize: FONTSIZE_TYPE.isRequired,
    style: PropTypes.shape({}),
    type: PropTypes.string,
  };

  static defaultProps = {
    style: {},
    type: '',
  };

  state = {
    value: '',
    open: this.props.type === 'sidebar',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.type !== nextProps.type ||
      this.props.style !== nextProps.style ||
      this.state.open !== nextState.open ||
      this.state.value !== nextState.value
    );
  }

  onPressEnter = () => {
    const { goTo, adTrack } = this.props;
    const { value } = this.state;

    if (this.preValue === value) return;

    goTo({
      pathname: '/products/',
      params: {
        search: {
          search: value,
        },
      },
    });
    adTrack('Search', { searchString: value });
    this.preValue = value;
  };

  onChange = e => {
    const { value = '' } = e.target;

    this.setState({ value });
  };

  toggleSearch = () => {
    const { open } = this.state;

    this.setState({ open: !open });
  };

  render() {
    const { fontSize, style, type } = this.props;
    const { open, value } = this.state;

    return (
      <div style={[styles.searchbar, style]}>
        <SearchIcon
          style={styles.icon}
          onClick={type === 'sidebar' ? () => {} : this.toggleSearch}
        />
        {!open ? null : (
          <Input
            value={value}
            placeholder={type === 'sidebar' ? '' : '搜尋'}
            style={styles.searchbarInput(fontSize)}
            onChange={this.onChange}
            onPressEnter={this.onPressEnter}
          />
        )}
      </div>
    );
  }
}
