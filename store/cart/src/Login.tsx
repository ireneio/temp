// import
import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import DraftText from '@meepshop/draft-text';
import { FbLoginIcon } from '@meepshop/icons';
import { useTranslation } from '@meepshop/locales';
import LoginModal, { useFbLogin } from '@meepshop/login-modal';

import styles from './styles/login.less';

// graphql typescript
import { getLoginMessage as getLoginMessageType } from '@meepshop/types/gqls/store';

// graphql import
import { getLoginMessage } from './gqls/login';

// definition
export default React.memo(() => {
  const { data } = useQuery<getLoginMessageType>(getLoginMessage);
  const { t } = useTranslation('cart');
  const colors = useContext(ColorsContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const { fbLogin, loading } = useFbLogin();
  const store = data?.viewer?.store;

  if (!store) return null;

  const isFbLoginEnabled = store.facebookSetting.isLoginEnabled;
  const isLoginMessageEnabled = store.setting?.shopperLoginMessageEnabled;
  const loginMessage = store.setting?.shopperLoginMessage;

  return (
    <>
      <div className={styles.login}>
        <div>{t('login-tip')}</div>
        <div>
          {!isFbLoginEnabled ? null : (
            <div
              className={styles.fb}
              onClick={() => {
                if (!loading) fbLogin();
              }}
            >
              <FbLoginIcon />
              {t('fb-login')}
            </div>
          )}

          <div
            className={styles.member}
            onClick={() => setIsLoginModalOpen(true)}
          >
            {t('member-login')}
          </div>
        </div>
      </div>

      {!isLoginMessageEnabled || !loginMessage ? null : (
        <div className={`${styles.message} ${isExpanded ? '' : styles.less}`}>
          <DraftText
            id="cart"
            content={loginMessage}
            __typename="DraftTextModule"
          />
          <div onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <>
                {t('less')}
                <UpOutlined />
              </>
            ) : (
              <>
                {t('more')}
                <DownOutlined />
              </>
            )}
          </div>
        </div>
      )}

      {!isLoginModalOpen ? null : (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.login} {
              background-color: ${transformColor(colors[1]).alpha(0.3)};
              color: ${colors[1]};
            }

            .${styles.member} {
              background-color: ${colors[4]};
              color: ${colors[2]};
            }

            .${styles.message} {
              background-color: ${transformColor(colors[1]).alpha(0.3)};
            }

            .${styles.message} > div:last-child {
              color: ${colors[3]};
            }
          `,
        }}
      />
    </>
  );
});
