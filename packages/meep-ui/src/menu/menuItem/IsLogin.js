import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import PersonIcon from 'react-icons/lib/md/person';

import { enhancer } from 'layout/DecoratorsRoot';
import { USER_TYPE } from 'constants/propTypes';

import * as styles from './styles/isLogin';
import * as locale from './locale';

@enhancer
@radium
export default class IsLogin extends React.Component {
  static propTypes = {
    transformLocale: PropTypes.func.isRequired,
    user: USER_TYPE.isRequired,
    displayMemberGroup: PropTypes.bool.isRequired,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: '',
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.displayMemberGroup !== nextProps.displayMemberGroup ||
      this.props.type !== nextProps.type
    );
  }

  render() {
    const { transformLocale, user, displayMemberGroup, type } = this.props;
    const { groupName } = user;

    const defaultText =
      type === 'sidebar' ? transformLocale(locale.MEMBER_CENTRE) : null;
    const groupNameText =
      type === 'sidebar' ? groupName : `${groupName}會員您好`;

    return (
      <span>
        <PersonIcon style={styles.icon} />
        <font style={styles.groupName}>
          {!(displayMemberGroup && groupName) ? defaultText : groupNameText}
        </font>
      </span>
    );
  }
}
