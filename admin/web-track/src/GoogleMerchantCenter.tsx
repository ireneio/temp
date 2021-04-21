// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { Icon, Button, Form, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { webTrackGoogleMerchantCenter_w258 as webTrackGoogleMerchantCenter } from '@meepshop/images';
import Link from '@meepshop/link';

import useSetGoogleMerchantCenterVerificationCode from './hooks/useSetGoogleMerchantCenterVerificationCode';
import styles from './styles/googleMerchantCenter.less';

// graphql typescript
import { googleMerchantCenterFragment as googleMerchantCenterFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  store: googleMerchantCenterFragmentType;
}

// definition
const { Item } = Form;
const URL =
  'https://supportmeepshop.com/knowledgebase/google-merchant-center-%e7%b6%b2%e5%9f%9f%e9%a9%97%e8%ad%89';

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator } = form;
    const {
      id,
      adTracks: { googleMerchantCenterVerificationCode },
    } = store;
    const { t } = useTranslation('web-track');
    const setGoogleMerchantCenterVerificationCode = useSetGoogleMerchantCenterVerificationCode(
      id || 'null-id' /** SHOULD_NOT_BE_NULL */,
      form,
    );
    const [editMode, setEditMode] = useState(false);

    return (
      <div>
        <img src={webTrackGoogleMerchantCenter} alt="GoogleMerchantCenter" />

        <div className={styles.title}>
          <div>{t('google-merchant-center.sub-title')}</div>

          <Tooltip
            arrowPointAtCenter
            placement="top"
            title={
              <Link href={URL} target="_blank">
                <a href={URL}>{t('google-merchant-center.tip')}</a>
              </Link>
            }
          />
        </div>

        <div className={styles.description}>
          {t('google-merchant-center.description')}
        </div>

        {editMode ? (
          <div className={styles.item}>
            <Item>
              {getFieldDecorator('verificationCode', {
                initialValue: googleMerchantCenterVerificationCode,
              })(
                <Input placeholder={t('google-merchant-center.placeholder')} />,
              )}
            </Item>

            <Button
              type="primary"
              onClick={async () => {
                if (await setGoogleMerchantCenterVerificationCode())
                  setEditMode(false);
              }}
            >
              {t('save')}
            </Button>

            <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
          </div>
        ) : (
          <>
            {googleMerchantCenterVerificationCode ? (
              <div className={styles.googleMerchantCenterVerificationCode}>
                <div>
                  {t(
                    'google-merchant-center.googleMerchantCenterVerificationCode',
                  )}
                </div>

                <div>{googleMerchantCenterVerificationCode}</div>

                <Icon type="edit" onClick={() => setEditMode(true)} />
              </div>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                {t('google-merchant-center.setting')}
              </Button>
            )}
          </>
        )}
      </div>
    );
  }),
);
