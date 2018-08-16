import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { person as PersonIcon } from 'react-icons/md';

import { enhancer } from 'layout/DecoratorsRoot';
import { USER_TYPE } from 'constants/propTypes';

import * as styles from './styles/isLogin';

@enhancer
@radium
export default class IsLogin extends React.PureComponent {
  static propTypes = {
    user: USER_TYPE.isRequired,
    displayMemberGroup: PropTypes.bool.isRequired,
  };

  render() {
    const {
      user: { groupName },
      displayMemberGroup,
    } = this.props;

    return (
      <>
        <PersonIcon style={styles.icon} />

        <font style={styles.groupName}>
          {!(displayMemberGroup && groupName) ? null : groupName}
        </font>
      </>
    );
  }
}
