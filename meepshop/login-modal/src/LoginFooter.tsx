// import
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Divider } from 'antd';
import { filter } from 'graphql-anywhere';

import { Colors as ColorsContext, Fb as FbContext } from '@meepshop/context';
import DraftText from '@meepshop/draft-text';
import { FbLoginIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import Line from '@meepshop/line';

import styles from './styles/loginFooter.less';

// graphql typescript
import { getLoginSetting as getLoginSettingType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { lineFragment } from '@meepshop/line/gqls';

import { getLoginSetting } from './gqls/loginFooter';

// typescript definition
interface PropsType {
  disableThirdPartyLogin?: boolean;
}

// definition
export default React.memo(({ disableThirdPartyLogin }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { fb, isLoginEnabled: isFbLoginEnabled } = useContext(FbContext);
  const { t } = useTranslation('login-modal');
  const router = useRouter();
  const { data } = useQuery<getLoginSettingType>(getLoginSetting);
  const [fbLoginLoading, setFbLoginLoading] = useState(false);

  const store = data?.viewer?.store;
  const lineLoginSetting = store?.lineLoginSetting || null;
  const isLoginMessageEnabled = store?.setting?.shopperLoginMessageEnabled;
  const loginDraftText = store?.setting?.shopperLoginMessage;
  const styleHtml = `
    .${styles.or}.ant-divider-with-text {
      color: ${colors[3]};
      border-top-color: ${colors[3]};
    }
  `;

  if (disableThirdPartyLogin)
    return !isLoginMessageEnabled || !loginDraftText ? null : (
      <>
        <Divider className={styles.or} />

        <DraftText
          id="cart"
          className={styles.message}
          content={loginDraftText}
          __typename="DraftTextModule"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: styleHtml,
          }}
        />
      </>
    );

  return (
    <>
      {!isFbLoginEnabled ? null : (
        <>
          <Divider className={styles.or}>{t('member-login.or')}</Divider>

          <Button
            className={styles.fbLogin}
            size="large"
            onClick={async () => {
              if (!fb || fbLoginLoading) return;

              setFbLoginLoading(true);
              await fb.login();
              setFbLoginLoading(false);
            }}
            loading={fbLoginLoading}
          >
            <FbLoginIcon />
            {t('member-login.fb-login')}
          </Button>

          <style
            dangerouslySetInnerHTML={{
              __html: styleHtml,
            }}
          />
        </>
      )}

      <Line
        className={styles.lineLogin}
        redirectUrl={router.asPath}
        lineLoginSetting={filter(lineFragment, lineLoginSetting)}
      />
    </>
  );
});
