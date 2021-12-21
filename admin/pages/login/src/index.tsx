// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import Head from 'next/head';

import { loginBackground } from '@meepshop/images';

import Login from './Login';
import ForgetPassword from './ForgetPassword';

import styles from './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  noWrapper: boolean;
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
      <>
        <Head>
          <title>meepShop 後台登入</title>

          <meta
            key="description"
            name="description"
            content="最彈性的頁面設計、會員分級工具等，還有隱藏式賣場、一頁式商店、天眼等強大功能，全都不分放案，讓你輕鬆就能架設質感的品牌官網販售商品。更多詳情歡迎預約專人開店諮詢。"
          />
        </Head>

        <div
          className={styles.root}
          style={{ backgroundImage: `url('${loginBackground}')` }}
        >
          <Content setAction={setAction} />
        </div>
      </>
    );
  },
);

LoginWrapper.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  noWrapper: true,
});

export default LoginWrapper;
