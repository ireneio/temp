import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as LOCALE from './locale';
import styles from './styles/index.less';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SendResetPswMailForm from './SendResetPswMailForm';
import { LOGIN, SIGNUP, FORGET_PSW } from './constants';

@enhancer
export default class Login extends React.PureComponent {
  static propTypes = {
    fbLogin: PropTypes.func.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
  };

  state = {
    options: LOGIN,
  };

  handleTypeChange = ({ target, options }) => {
    if (options === LOGIN) {
      this.setState({ options });
    } else {
      this.setState({ options: target.value });
    }
  };

  toggleToSignup = () => {
    this.setState({ options: SIGNUP });
  };

  toggleToForgetPassword = () => {
    this.setState({ options: FORGET_PSW });
  };

  render() {
    const {
      fbLogin,
      colors,
      hasStoreAppPlugin,
      dispatchAction,
      transformLocale,
    } = this.props;
    const { options } = this.state;
    let optionsComp = null;

    switch (options) {
      case LOGIN: {
        optionsComp = (
          <LoginForm
            dispatchAction={dispatchAction}
            fbLogin={fbLogin}
            hasStoreAppPlugin={hasStoreAppPlugin}
            colors={colors}
            transformLocale={transformLocale}
            toggleToSignup={this.toggleToSignup}
            toggleToForgetPassword={this.toggleToForgetPassword}
          />
        );
        break;
      }
      case SIGNUP: {
        optionsComp = (
          <SignupForm
            colors={colors}
            transformLocale={transformLocale}
            dispatchAction={dispatchAction}
            handleTypeChange={this.handleTypeChange}
            hasStoreAppPlugin={hasStoreAppPlugin}
          />
        );
        break;
      }
      case FORGET_PSW: {
        optionsComp = (
          <SendResetPswMailForm
            colors={colors}
            transformLocale={transformLocale}
            dispatchAction={dispatchAction}
          />
        );
        break;
      }
      default:
        break;
    }

    return (
      <div className={styles.root}>
        <Radio.Group value={options} onChange={this.handleTypeChange}>
          <Radio.Button style={{ color: '#000' }} value={SIGNUP}>
            {transformLocale(LOCALE.SIGNUP)}
          </Radio.Button>

          <Radio.Button style={{ color: '#000' }} value={LOGIN}>
            {transformLocale(LOCALE.LOGIN)}
          </Radio.Button>
        </Radio.Group>

        {optionsComp}
      </div>
    );
  }
}
