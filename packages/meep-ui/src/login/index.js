import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as LOCALE from './locale';
import * as styles from './styles';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import SendResetPswMailForm from './sendResetPswMailForm';
import { LOGIN, SIGNUP, FORGET_PSW } from './constants';

@enhancer
@radium
export default class Login extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired,
    isFBLoginInstalled: PropTypes.bool.isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };
  state = {
    options: LOGIN,
  };

  handleSizeChange = e => {
    this.setState({ options: e.target.value });
  };

  toggleToSignup = () => {
    this.setState({ options: SIGNUP });
  };

  toggleToForgetPassword = () => {
    this.setState({ options: FORGET_PSW });
  };

  render() {
    const {
      transformLocale,
      fbLogin,
      isFBLoginInstalled,
      dispatchAction,
      colors,
    } = this.props;
    const { options } = this.state;
    let optionsComp = null;
    switch (options) {
      case LOGIN: {
        optionsComp = (
          <LoginForm
            dispatchAction={dispatchAction}
            fbLogin={fbLogin}
            isFBLoginInstalled={isFBLoginInstalled}
            colors={colors}
            toggleToSignup={this.toggleToSignup}
            toggleToForgetPassword={this.toggleToForgetPassword}
            transformLocale={transformLocale}
          />
        );
        break;
      }
      case SIGNUP: {
        optionsComp = (
          <SignupForm
            dispatchAction={dispatchAction}
            colors={colors}
            transformLocale={transformLocale}
          />
        );
        break;
      }
      case FORGET_PSW: {
        optionsComp = (
          <SendResetPswMailForm
            dispatchAction={dispatchAction}
            colors={colors}
            transformLocale={transformLocale}
          />
        );
        break;
      }
      default:
        break;
    }
    return (
      <div style={{ paddingTop: '5vh', paddingBottom: '5vh' }}>
        <div style={styles.radioGroupWrapper}>
          <Radio.Group value={options} onChange={this.handleSizeChange}>
            <Radio.Button style={{ color: '#000' }} value={SIGNUP}>
              {transformLocale(LOCALE.SIGNUP)}
            </Radio.Button>
            <Radio.Button style={{ color: '#000' }} value={LOGIN}>
              {transformLocale(LOCALE.LOGIN)}
            </Radio.Button>
          </Radio.Group>
        </div>
        <div>{optionsComp}</div>
      </div>
    );
  }
}
