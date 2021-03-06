// import
import React, { useState, useContext } from 'react';
import { Modal } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import ForgetPassword from './ForgetPassword';
import Login from './Login';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  onClose: () => void;
  disableThirdPartyLogin?: boolean;
  initialEmail?: string;
}

// definition
export default React.memo(
  ({ onClose, disableThirdPartyLogin, initialEmail }: PropsType) => {
    const colors = useContext(ColorsContext);
    const { t } = useTranslation('login-modal');
    const [isForgetPassword, setIsForgetPassword] = useState(false);

    return (
      <>
        <Modal
          className={styles.root}
          visible
          centered
          width={480}
          title={t(
            isForgetPassword ? 'forget-password.title' : 'member-login.title',
          )}
          onCancel={onClose}
          maskClosable={false}
          footer={null}
        >
          {isForgetPassword ? (
            <ForgetPassword
              initialEmail={initialEmail}
              setIsForgetPassword={setIsForgetPassword}
            />
          ) : (
            <Login
              onClose={onClose}
              disableThirdPartyLogin={disableThirdPartyLogin}
              initialEmail={initialEmail}
              setIsForgetPassword={setIsForgetPassword}
            />
          )}
        </Modal>

        <style
          dangerouslySetInnerHTML={{
            __html: `
            .${styles.root} .ant-modal-title,
            .${styles.root} .ant-modal-close {
              color: ${colors[3]};
            }

            .${styles.root} .ant-modal-content,
            .${styles.root} .ant-modal-header {
              background-color: ${colors[0]};
            }

            .${styles.root} .ant-modal-header {
              border-bottom: 1px solid ${transformColor(colors[5]).alpha(0.4)};
            }
          `,
          }}
        />
      </>
    );
  },
);
