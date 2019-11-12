import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import withContext from '@store/utils/lib/withContext';
import adTrackContext from '@store/ad-track';

import { enhancer } from 'layout/DecoratorsRoot';

import Icon from './Icon';
import styles from './styles/searchBar.less';

@withContext(adTrackContext)
@enhancer
export default class SearchBar extends React.PureComponent {
  preValue = '';

  static propTypes = {
    /** context */
    goTo: PropTypes.func.isRequired,

    /** props */
    adTrack: PropTypes.shape({}).isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    value: '',
    showSearchBar: false,
  };

  search = ({ target: { value } }) => {
    const { goTo, adTrack } = this.props;

    if (this.preValue === value) return;

    goTo({
      pathname: '/products/',
      params: {
        search: {
          search: value,
        },
      },
    });
    adTrack.search({ searchString: value });
    this.preValue = value;
  };

  render() {
    const { title } = this.props;
    const { value, showSearchBar } = this.state;

    return (
      <Icon
        font="search"
        direction="left"
        onClick={() => this.setState({ showSearchBar: !showSearchBar })}
      >
        {!showSearchBar ? null : (
          <Input
            className={styles.root}
            placeholder={title}
            value={value}
            onChange={({ target: { value: changeValue } }) =>
              this.setState({ value: changeValue })
            }
            onPressEnter={this.search}
          />
        )}
      </Icon>
    );
  }
}
