// import
import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Button, Modal, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import {
  webTrackGoogleAds_w172 as webTrackGoogleAds,
  webTrackGoogleAdsInstruction_w890 as webTrackGoogleAdsInstruction,
} from '@meepshop/images';

import useClipboard from './hooks/useClipboard';
import useUpdateGoogleAds from './hooks/useUpdateGoogleAds';
import useValidateGoogleAdsCode from './hooks/useValidateGoogleAdsCode';
import useValidateGoogleAdwordsConfig from './hooks/useValidateGoogleAdwordsConfig';
import styles from './styles/googleAds.less';

// graphql typescript
import { googleAdsFragment as googleAdsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: googleAdsFragmentType;
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

export default React.memo(({ store }: PropsType) => {
  const {
    id,
    adTracks: {
      googleAdwordsConfig,
      googleAdwordsSignUp,
      googleAdwordsBeginCheckout,
      googleAdwordsPurchase,
    },
  } = store;
  const googleFeedsLink = store.setting?.googleFeedsLink;
  const { t } = useTranslation('web-track');
  const [isOpen, openModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const updateGoogleAds = useUpdateGoogleAds(id, setEditMode);
  const validateGoogleAdsCode = useValidateGoogleAdsCode();
  const validateGoogleAdwordsConfig = useValidateGoogleAdwordsConfig();

  useClipboard(
    googleFeedsLink || '',
    '#googleFeedsLink',
    t('google-ads.copied'),
  );

  return (
    <div>
      <img src={webTrackGoogleAds} alt="GoogleAds" />

      <div className={styles.title}>
        <div>Google Ads</div>
        <Tooltip
          arrowPointAtCenter
          placement="bottomLeft"
          title={t('tip')}
          onClick={() => openModal(true)}
        />
      </div>

      <Modal
        width="fit-content"
        footer={null}
        visible={isOpen}
        onCancel={() => openModal(false)}
      >
        <img src={webTrackGoogleAdsInstruction} alt="GoogleAdsInstruction" />
      </Modal>

      <div className={styles.description}>{t('google-ads.description')}</div>

      <div className={styles.warning}>
        <ExclamationCircleOutlined />

        {t('google-ads.warning')}
      </div>

      {editMode ? (
        <Form className={styles.item} onFinish={updateGoogleAds}>
          <FormItem
            name={['googleAdwordsConfig']}
            label={t('google-ads.global-code')}
            initialValue={googleAdwordsConfig}
            rules={[validateGoogleAdwordsConfig]}
            validateTrigger="onBlur"
          >
            <Input placeholder={t('google-ads.global-code-placeholder')} />
          </FormItem>

          <div>{t('google-ads.event-setting')}</div>

          <FormItem
            name={['googleAdwordsSignUp']}
            label={t('google-ads.sign-up')}
            initialValue={googleAdwordsSignUp}
            rules={[
              {
                validator: validateGoogleAdsCode,
              },
            ]}
          >
            <TextArea
              placeholder={t('google-ads.event-placeholder')}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
          </FormItem>

          <FormItem
            name={['googleAdwordsBeginCheckout']}
            label={t('google-ads.begin-checkout')}
            initialValue={googleAdwordsBeginCheckout}
            rules={[
              {
                validator: validateGoogleAdsCode,
              },
            ]}
          >
            <TextArea
              placeholder={t('google-ads.event-placeholder')}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
          </FormItem>

          <FormItem
            name={['googleAdwordsPurchase']}
            label={t('google-ads.purchase')}
            initialValue={googleAdwordsPurchase}
            rules={[
              {
                validator: validateGoogleAdsCode,
              },
            ]}
          >
            <TextArea
              placeholder={t('google-ads.event-placeholder')}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
          </FormItem>

          <div className={styles.button}>
            <Button type="primary" htmlType="submit">
              {t('save')}
            </Button>

            <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
          </div>
        </Form>
      ) : (
        <div className={styles.value}>
          <Button onClick={() => setEditMode(true)}>
            {t('google-ads.setting')}
          </Button>

          <div>
            <div>{t('google-ads.global-code')}</div>
            <div>{googleAdwordsConfig}</div>
          </div>

          <div>{t('google-ads.event-setting')}</div>

          <div className={styles.eventSetting}>
            <div>{t('google-ads.sign-up')}</div>
            <div className={`${!googleAdwordsSignUp && styles.noSetting}`}>
              {googleAdwordsSignUp || t('google-ads.not-setting')}
            </div>
          </div>
          <div className={styles.eventSetting}>
            <div>{t('google-ads.begin-checkout')}</div>
            <div
              className={`${!googleAdwordsBeginCheckout && styles.noSetting}`}
            >
              {googleAdwordsBeginCheckout || t('google-ads.not-setting')}
            </div>
          </div>
          <div className={styles.eventSetting}>
            <div>{t('google-ads.purchase')}</div>
            <div className={`${!googleAdwordsPurchase && styles.noSetting}`}>
              {googleAdwordsPurchase || t('google-ads.not-setting')}
            </div>
          </div>
        </div>
      )}

      <div className={styles.dpa}>
        {t('google-ads.dpa')}
        <div>
          <div>{t('google-ads.dpa-description.0')}</div>
          <div>{t('google-ads.dpa-description.1')}</div>
        </div>
      </div>

      <Button disabled={!googleFeedsLink} id="googleFeedsLink">
        {t('google-ads.copy-dpa-link')}
      </Button>
    </div>
  );
});
