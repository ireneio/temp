// import
import { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { AdTrackContext } from '@admin/ad-track';
import Link from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import { loginBackground } from '@meepshop/images';

import styles from './styles/index.less';

// definition
const SignUpFail: NextPage = React.memo(() => {
  const { t } = useTranslation('sign-up-fail');
  const adTrack = useContext(AdTrackContext);

  useEffect(() => {
    adTrack.custom('點擊', '月租註冊_驗證失敗', '月租註冊');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.root}
      style={{ backgroundImage: `url('${loginBackground}')` }}
    >
      <div className={styles.wrapper}>
        <ExclamationCircleOutlined />

        <div>{t('title')}</div>
        <div>{t('description')}</div>
        <div>{t('please-register-again')}</div>

        <Link href="/sign-up">
          <Button
            type="primary"
            size="large"
            onClick={() =>
              adTrack.custom('點擊', '月租註冊_重新註冊', '月租註冊')
            }
          >
            {t('go-to-sign-up')}
          </Button>
        </Link>
      </div>
    </div>
  );
});

SignUpFail.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SignUpFail;
