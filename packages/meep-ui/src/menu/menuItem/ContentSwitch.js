import React from 'react';
import PropTypes from 'prop-types';

import { enhancer } from 'layout/DecoratorsRoot';
import { NOTLOGIN } from 'constants/isLogin';
import { LOCALE_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';

import Icon from './Icon';
import IsLogin from './IsLogin';
import { ACTION_TYPE } from './../constants';
import { PARAMS_TYPE } from './constants';

const ContentSwitch = ({
  transformLocale,
  isLogin,
  type,
  action,
  title,
  icon,
  params,
  ...props
}) => {
  if (action === 8 && isLogin !== NOTLOGIN) {
    return <IsLogin type={type} {...props} {...params} />;
  } else if (icon && icon.use) {
    return <Icon {...icon} title={transformLocale(title)} />;
  }

  return transformLocale(title);
};

ContentSwitch.propTypes = {
  transformLocale: PropTypes.func.isRequired,
  isLogin: ISLOGIN_TYPE.isRequired,
  type: PropTypes.string,
  action: ACTION_TYPE.isRequired,
  title: LOCALE_TYPE.isRequired,
  icon: PropTypes.shape({
    use: PropTypes.bool.isRequired,
  }),
  params: PARAMS_TYPE,
};

ContentSwitch.defaultProps = {
  type: '',
  icon: null,
  params: {},
};

export default enhancer(ContentSwitch);
