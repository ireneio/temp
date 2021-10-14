import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { useQuery } from '@apollo/react-hooks';

import withHook from '@store/utils/lib/withHook';
import { withTranslation } from '@meepshop/locales';

import { enhancer } from 'layout/DecoratorsRoot';

import Group from './group';
import { getActivity } from './gqls';
import * as styles from './styles';

@withTranslation('activity')
@withHook(({ value }) => {
  const { data, loading } = useQuery(getActivity, {
    variables: {
      input: {
        activityId: value,
      },
    },
    skip: !value,
  });

  return { activity: data?.viewer?.store?.activity || null, loading };
})
@enhancer
@radium
export default class Activity extends React.PureComponent {
  static propTypes = {
    background: PropTypes.string,
    t: PropTypes.func.isRequired,
  };

  static defaultProps = {
    background: '#fafafa',
  };

  render() {
    const { t, background, activity, loading } = this.props;
    const groups = activity?.target?.groups;

    if (loading) return null;

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
