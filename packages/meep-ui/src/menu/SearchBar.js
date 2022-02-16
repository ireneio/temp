import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';

import Icon from './Icon';
import styles from './styles/searchBar.less';

@withTranslation('menu')
@withHook(() => ({ router: useRouter() }))
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@enhancer
export default class SearchBar extends React.PureComponent {
  preValue = '';

  static propTypes = {
    /** props */
    adTrack: PropTypes.shape({}).isRequired,
  };

  state = {
    value: '',
    showSearchBar: false,
  };

  search = ({ target: { value } }) => {
    const { router, adTrack } = this.props;

    if (this.preValue === value) return;

    router.push({
      pathname: '/products/',
      query: {
        search: value,
      },
    });

    adTrack.search({ searchString: value });
    this.preValue = value;
  };

  render() {
    const { t } = this.props;
    const { value, showSearchBar } = this.state;

    return (
      <Icon
        image={{
          __typename: 'DefaultIcon',
          icon: 'SEARCH',
        }}
        imagePosition="LEFT"
        onClick={() => this.setState({ showSearchBar: !showSearchBar })}
      >
        {!showSearchBar ? null : (
          <div className={styles.form}>
            <Input
              className={styles.input}
              type="search"
              placeholder={t('search')}
              value={value}
              onChange={({ target: { value: changeValue } }) =>
                this.setState({ value: changeValue })
              }
              onPressEnter={this.search}
            />
          </div>
        )}
      </Icon>
    );
  }
}
