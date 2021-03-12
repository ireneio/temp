import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@meepshop/locales';

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
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    background: '#fafafa',
    activity: null,
  };

  render() {
    const { activity, background, t } = this.props;
    const { groups } = (activity || {}).target || {};

    if (!activity)
      return <div style={styles.blank}>{t('please-select-activity')}</div>;

    return (
      <div style={styles.root}>
        {groups.map(({ id, ...group }) => (
          <Group key={id} group={group} background={background} />
        ))}
      </div>
    );
  }
}
