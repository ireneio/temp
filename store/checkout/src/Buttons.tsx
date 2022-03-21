// import
import React, { useContext } from 'react';
import { Form, Button, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

import styles from './styles/buttons.less';

// typescript definition
interface PropsType {
  loading: boolean;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ loading }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const { push } = useRouter();

  return (
    <div className={styles.root}>
      <div className={styles.continue} onClick={() => push('/cart')}>
        <LeftOutlined />

        {t('go-back-to-cart')}
      </div>

      <div>
        <FormItem shouldUpdate noStyle>
          {({ getFieldValue, getFieldsError, submit }) =>
            !getFieldValue(['payment'])?.paymentLater ? null : (
              <Button
                className={styles.paymentLater}
                loading={loading}
                disabled={getFieldsError().some(
                  ({ errors }) => errors.length !== 0,
                )}
                onClick={submit}
              >
                {t('confirm')}: {t('pay-later')}
              </Button>
            )
          }
        </FormItem>

        <FormItem shouldUpdate noStyle>
          {({ getFieldValue, getFieldsError, setFieldsValue, submit }) => (
            <Button
              className={styles.confirm}
              loading={loading}
              disabled={getFieldsError().some(
                ({ errors }) => errors.length !== 0,
              )}
              onClick={() => {
                setFieldsValue({ isPaymentNow: true });
                submit();
              }}
            >
              {getFieldValue(['payment'])?.paymentLater
                ? `${t('confirm')}: ${t('pay-now')}`
                : t('confirm')}
            </Button>
          )}
        </FormItem>

        <FormItem name={['isPaymentNow']} noStyle>
          <Input type="hidden" />
        </FormItem>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
              .${styles.continue} {
                color: ${colors[3]};
              }

              .${styles.paymentLater}, .${styles.paymentLater}:hover, .${styles.paymentLater}:focus {
                color: ${colors[2]};
                background-color: ${colors[1]};
                border-color: ${colors[1]};
              }

              .${styles.confirm}, .${styles.confirm}:hover, .${styles.confirm}:focus {
                color: ${colors[2]};
                background-color: ${colors[4]};
                border-color: ${colors[4]};
              }
            `,
        }}
      />
    </div>
  );
});
