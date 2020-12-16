// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';

import { loginBackground } from '@meepshop/images';

import Login from './Login';
import ForgetPassword from './ForgetPassword';

import styles from './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const LoginWrapper: NextPage<PropsType> = React.memo(
  (): React.ReactElement => {
    const [action, setAction] = useState<'LOGIN' | 'FORGET_PASSWORD'>('LOGIN');

    const Content = {
      LOGIN: Login,
      FORGET_PASSWORD: ForgetPassword,
    }[action];

    return (
      <div
        className={styles.root}
        style={{ backgroundImage: `url('${loginBackground}')` }}
      >
        <Content setAction={setAction} />
      </div>
    );
  },
);

LoginWrapper.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default LoginWrapper;
