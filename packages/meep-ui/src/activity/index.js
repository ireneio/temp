import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { enhancer } from 'layout';
import areEqual from 'fbjs/lib/areEqual';

import { ID_TYPE } from 'constants/propTypes';

import Group from './group';
import * as styles from './styles';
import { PLEASE_SELECT_ACTIVITY } from './locale';

@enhancer
@radium
export default class Activity extends React.Component {
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
    transformLocale: PropTypes.func.isRequired,
  };

  static defaultProps = {
    background: '#fafafa',
    activity: null,
    cart: null,
  };

  shouldComponentUpdate(nextProps) {
    return (
      !areEqual(this.props.activity, nextProps.activity) ||
      this.state.background !== nextProps.background
    );
  }

  render() {
    const {
      activity,
      background,
      cart,
      wishList,
      stockNotificationList,
      transformLocale,
    } = this.props;
    const { groups } = (activity || {}).target || {};
    if (!activity) {
      return (
        <div style={styles.blank}>
          {transformLocale(PLEASE_SELECT_ACTIVITY)}
        </div>
      );
    }
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
