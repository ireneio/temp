// typescript import
import { BaseButtonProps } from 'antd/lib/button/button';

// import
import React from 'react';
import { Button } from 'antd';

import { LineLoginIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import styles from './styles/index.less';

// typescript definition
interface PropsType extends BaseButtonProps {
  redirectUrl: string;
}

// definition
export default React.memo(({ redirectUrl, ...props }: PropsType) => {
  const { t } = useTranslation('line');
  const router = useRouter();

  return (
    <Button
      {...props}
      className={styles.root}
      icon={<LineLoginIcon />}
      onClick={() =>
        router.push(
          [
            `https://access.line.me/oauth2/v2.1/authorize?`,
            `response_type=code`,
            `client_id=1656796238`, // FIXME: T10424
            `redirect_uri=https://${router.domain}/api/auth/line-login`,
            `state=${redirectUrl}`,
            `scope=profile%20openid%20email`,
          ].join('&'),
        )
      }
    >
      LINE {t('login')}
    </Button>
  );
});
