// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useState, useContext } from 'react';
import { Modal, Form, Button, Input, Icon } from 'antd';
import { isFullWidth, isEmail } from 'validator';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import styles from './styles/invoice.less';
import useLoginSubmit from './hooks/useLoginSubmit';

export interface PropsType extends FormComponentProps {
  cname: string;
  userEmail: string;
  hideLogin: () => void;
}

// definition
const { Item } = Form;
const { Password } = Input;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
export default Form.create<PropsType>()(
  React.memo(({ cname, userEmail, hideLogin, form }: PropsType) => {
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const { t } = useTranslation('landing-page');
    const colors = useContext(ColorsContext);
    const onSubmit = useLoginSubmit({
      form,
      cname,
      hideLogin,
      isForgotPassword,
    });

    const { getFieldDecorator } = form;

    return (
      <Modal title={t('plz-login')} footer={null} onCancel={hideLogin}>
        <Form className={styles.root} onSubmit={onSubmit}>
          <Item className={styles.formItem}>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: t('is-required'),
                },
                {
                  validator: (_rule, value, callback) => {
                    if (value && (isFullWidth(value) || !isEmail(value)))
                      callback(t('not-email'));
                    else callback();
                  },
                },
              ],
              validateFirst: true,
              initialValue: userEmail,
            })(<Input placeholder={t('email')} />)}
          </Item>

          {isForgotPassword ? null : (
            <Item className={styles.formItem}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ],
              })(<Password placeholder={t('password')} />)}
            </Item>
          )}

          <div className={styles.formItem}>
            {isForgotPassword ? (
              <Button
                className={styles.button}
                type="primary"
                onClick={() => setIsForgotPassword(false)}
              >
                {t('go-back')}
              </Button>
            ) : (
              <div
                className={styles.forgetPassword}
                onClick={() => setIsForgotPassword(true)}
              >
                <Icon type="lock" theme="filled" />

                {t('forget-password')}
              </div>
            )}

            <Button className={styles.button} type="primary" htmlType="submit">
              {isForgotPassword ? t('send') : t('login')}
            </Button>
          </div>
        </Form>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.button} {
                color: ${colors[2]};
                border-color: ${colors[4]};
                background: ${colors[4]};
              }
            `,
          }}
        />
      </Modal>
    );
  }),
);
