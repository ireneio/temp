import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

import { withTranslation } from '@store/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import DraftText from 'draftText';

import styles from './styles/index.less';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SendResetPswMailForm from './SendResetPswMailForm';
import { LOGIN, SIGNUP, FORGET_PSW } from './constants';

@withTranslation('login')
@enhancer
export default class Login extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    storeSetting: PropTypes.shape({}).isRequired,
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
      colors,
      t,
      storeSetting: { shopperLoginMessageEnabled, shopperLoginMessage },
    } = this.props;
    const { options } = this.state;
    let optionsComp = null;

    switch (options) {
      case LOGIN: {
        optionsComp = (
          <LoginForm
            toggleToSignup={this.toggleToSignup}
            toggleToForgetPassword={this.toggleToForgetPassword}
          />
        );
        break;
      }
      case SIGNUP: {
        optionsComp = <SignupForm handleTypeChange={this.handleTypeChange} />;
        break;
      }
      case FORGET_PSW: {
        optionsComp = <SendResetPswMailForm />;
        break;
      }
      default:
        break;
    }

    return (
      <div className={styles.root}>
        <Radio.Group value={options} onChange={this.handleTypeChange}>
          <Radio.Button style={{ color: '#000' }} value={SIGNUP}>
            {t('signup')}
          </Radio.Button>

          <Radio.Button style={{ color: '#000' }} value={LOGIN}>
            {t('login')}
          </Radio.Button>
        </Radio.Group>

        {optionsComp}

        {!shopperLoginMessageEnabled ? null : (
          <>
            <div className={styles.hr} style={{ backgroundColor: colors[5] }} />
            <DraftText
              style={{ marginBottom: 'calc(60px - 5vh)', padding: '0px' }}
              value={shopperLoginMessage}
            />
          </>
        )}
      </div>
    );
  }
}
