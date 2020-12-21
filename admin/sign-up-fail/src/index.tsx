// import
import { NextPage } from 'next';
import React from 'react';
import { Button, Icon } from 'antd';

import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import { loginBackground } from '@meepshop/images';

import styles from './styles/index.less';

// definition
const SignUpFail: NextPage = React.memo(() => {
  const { t } = useTranslation('sign-up-fail');

  return (
    <div
      className={styles.root}
      style={{ backgroundImage: `url('${loginBackground}')` }}
    >
      <div className={styles.wrapper}>
        <Icon type="exclamation-circle" />

        <div>{t('title')}</div>
        <div>{t('description')}</div>
        <div>{t('please-register-again')}</div>

        <Link href="/sign-up">
          <Button type="primary" size="large">
            {t('go-to-sign-up')}
          </Button>
        </Link>
      </div>
    </div>
  );
});

SignUpFail.getInitialProps = async () => ({
  namespacesRequired: ['sign-up-fail'],
});

export default SignUpFail;
