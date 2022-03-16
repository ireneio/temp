// import
import React, { useState, useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { Form } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext, Fb as FbContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import { FbLoginIcon } from '@meepshop/icons';
import Line from '@meepshop/line';
import LoginModal from '@meepshop/login-modal';

import styles from './styles/login.less';

// graphql typescript
import { loginFragment as loginFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { lineFragment } from '@meepshop/line/gqls';

// typescript definition
interface PropsType {
  store: loginFragmentType | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ store }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const { fb, isLoginEnabled: isFbLoginEnabled } = useContext(FbContext);
  const [fbLoginLoading, setFbLoginLoading] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

  return (
    <div className={styles.root}>
      <span>{t('login-tip')}</span>

      <Line
        className={styles.line}
        redirectUrl="/checkout"
        lineLoginSetting={filter(lineFragment, store?.lineLoginSetting || null)}
      />

      {!isFbLoginEnabled ? null : (
        <div
          className={styles.fb}
          onClick={async () => {
            if (!fb || fbLoginLoading) return;

            setFbLoginLoading(true);
            await fb.login();
            setFbLoginLoading(false);
          }}
        >
          <FbLoginIcon />
          {t('fb-login')}
        </div>
      )}

      <div className={styles.login} onClick={() => setOpenLoginModal(true)}>
        {t('login')}
      </div>

      {!openLoginModal ? null : (
        <FormItem dependencies={[['userEmail']]} noStyle>
          {({ getFieldValue }) => (
            <LoginModal
              initialEmail={getFieldValue(['userEmail'])}
              onClose={() => setOpenLoginModal(false)}
              disableThirdPartyLogin
            />
          )}
        </FormItem>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
              .${styles.root} {
                background-color: ${transformColor(colors[5]).alpha(0.3)};
                color: ${colors[3]};
              }

              .${styles.login} {
                background-color: ${colors[4]};
                color: ${colors[2]};
              }
            `,
        }}
      />
    </div>
  );
});
