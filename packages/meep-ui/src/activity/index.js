import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@store/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE } from 'constants/propTypes';

import Group from './group';
import * as styles from './styles';

@withTranslation('activity')
@enhancer
@radium
export default class Activity extends React.PureComponent {
  static propTypes = {
    background: PropTypes.string,
    activity: PropTypes.shape({
      target: PropTypes.shape({
        groups: PropTypes.arrayOf(
          PropTypes.shape({
            id: ID_TYPE.isRequired,
          }),
        ).isRequired,
      }).isRequired,
    }),
    cart: PropTypes.shape({}),
    wishList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    stockNotificationList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    background: '#fafafa',
    activity: null,
    cart: null,
  };

  render() {
    const {
      activity,
      background,
      cart,
      wishList,
      stockNotificationList,
      t,
    } = this.props;
    const { groups } = (activity || {}).target || {};

    if (!activity)
      return <div style={styles.blank}>{t('please-select-activity')}</div>;

    return (
      <div style={styles.root}>
        {groups.map(({ id, ...group }) => (
          <Group
            key={id}
            group={group}
            background={background}
            cart={cart}
            wishList={wishList}
            stockNotificationList={stockNotificationList}
          />
        ))}
      </div>
    );
  }
}
