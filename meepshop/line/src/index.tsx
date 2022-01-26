// typescript import
import { BaseButtonProps } from 'antd/lib/button/button';

// import
import React, { useEffect } from 'react';
import { Button, notification } from 'antd';

import { LineLoginIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import styles from './styles/index.less';

// graphql typescript
import { lineFragment as lineFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType extends BaseButtonProps {
  redirectUrl: string;
  className?: string;
  lineLoginSetting: lineFragmentType | null;
}

// definition
export default React.memo(
  ({ redirectUrl, className, lineLoginSetting, ...props }: PropsType) => {
    const { t } = useTranslation('line');
    const router = useRouter();

    useEffect(() => {
      if (router.query.lineLoginError) {
        notification.error({ message: t('login-fail') });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!lineLoginSetting?.channelId || !lineLoginSetting?.isLoginEnabled)
      return null;

    return (
      <Button
        {...props}
        className={`${styles.root} ${className || ''}`}
        icon={<LineLoginIcon />}
        onClick={() =>
          router.push(
            [
              `https://access.line.me/oauth2/v2.1/authorize?`,
              `response_type=code`,
              `client_id=${lineLoginSetting.channelId}`,
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
  },
);
