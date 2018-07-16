import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { enhancer } from '@meepshop/meep-ui/lib/layout/DecoratorsRoot';

import * as LOCALE from './locale';
import './styles/index.less';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import SendResetPswMailForm from './sendResetPswMailForm';
import { LOGIN, SIGNUP, FORGET_PSW } from './constants';

@enhancer
export default class Login extends React.PureComponent {
  static propTypes = {
    fbLogin: PropTypes.func.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
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
      <div style={{ paddingTop: '5vh', paddingBottom: '5vh' }}>
        <div className="loginView-radioGroupWrapper">
          <Radio.Group value={options} onChange={this.handleTypeChange}>
            <Radio.Button style={{ color: '#000' }} value={SIGNUP}>
              {transformLocale(LOCALE.SIGNUP)}
            </Radio.Button>
            <Radio.Button style={{ color: '#000' }} value={LOGIN}>
              {transformLocale(LOCALE.LOGIN)}
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="loginView-formWrapper">{optionsComp}</div>
      </div>
    );
  }
}
