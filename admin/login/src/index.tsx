// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useState } from 'react';

import Login from './Login';
import ForgetPassword from './ForgetPassword';

import styles from './styles/index.less';

// typescript definition
export interface PropsType extends FormComponentProps {
  setAction: (input: 'LOGIN' | 'FORGET_PASSWORD') => void;
}

const LoginWrapper: NextPage = React.memo(
  (): React.ReactElement => {
    const [action, setAction] = useState<'LOGIN' | 'FORGET_PASSWORD'>('LOGIN');

    const Content = {
      LOGIN: Login,
      FORGET_PASSWORD: ForgetPassword,
    }[action];

    return (
      <div className={styles.root}>
        <Content setAction={setAction} />
      </div>
    );
  },
);

LoginWrapper.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default LoginWrapper;
