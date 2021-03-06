// import
import React, { useState, useEffect } from 'react';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Form, Button, Input, message } from 'antd';
import { useCopyToClipboard } from 'react-use';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { webTrackGoogleAds_w172 as webTrackGoogleAds } from '@meepshop/images';
import Link from '@meepshop/link';

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
  const [editMode, setEditMode] = useState(false);
  const updateGoogleAds = useUpdateGoogleAds(id, setEditMode);
  const validateGoogleAdsCode = useValidateGoogleAdsCode();
  const validateGoogleAdwordsConfig = useValidateGoogleAdwordsConfig();
  const [{ value: copyValue }, copyToClipboard] = useCopyToClipboard();
  const [copyTimes, setCopyTimes] = useState<number>(0);

  useEffect(() => {
    if (copyValue) {
      message.success({
        content: t('google-ads.copied'),
        duration: 2,
        icon: <CheckCircleOutlined />,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyValue, copyTimes]);

  return (
    <div>
      <img src={webTrackGoogleAds} alt="GoogleAds" />

      <div className={styles.title}>
        <div>Google Ads</div>

        <Tooltip
          arrowPointAtCenter
          placement="top"
          onlyLink
          title={
            <Link
              href="https://supportmeepshop.com/knowledgebase/google-ads?????????/"
              target="_blank"
            >
              <a href="https://supportmeepshop.com/knowledgebase/google-ads?????????/">
                {t(`google-ads.tip`)}
              </a>
            </Link>
          }
        />
      </div>

      <div className={styles.description}>{t('google-ads.description')}</div>

      <div className={styles.warning}>
        <ExclamationCircleOutlined />

        {t('google-ads.warning')}
      </div>

      {editMode ? (
        <Form className={styles.form} onFinish={updateGoogleAds}>
          <FormItem
            name={['googleAdwordsConfig']}
            label={t('google-ads.global-code')}
            initialValue={googleAdwordsConfig}
            rules={[validateGoogleAdwordsConfig]}
            validateTrigger="onBlur"
          >
            <Input placeholder={t('google-ads.global-code-placeholder')} />
          </FormItem>

          <div className={styles.subtitle}>
            {t('google-ads.event-setting')}

            <Tooltip
              arrowPointAtCenter
              placement="top"
              onlyLink
              title={
                <Link
                  href="https://supportmeepshop.com/knowledgebase/google-ads??????????????????/"
                  target="_blank"
                >
                  <a href="https://supportmeepshop.com/knowledgebase/google-ads??????????????????/">
                    {t(`google-ads.event-setting-tip`)}
                  </a>
                </Link>
              }
            />
          </div>

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
        <>
          <Button className={styles.row} onClick={() => setEditMode(true)}>
            {t('google-ads.setting')}
          </Button>

          <div className={styles.row}>
            <div>{t('google-ads.global-code')}</div>

            <div className={`${!googleAdwordsConfig ? styles.empty : ''}`}>
              {googleAdwordsConfig || t('google-ads.not-setting')}
            </div>
          </div>

          <div className={styles.subtitle}>
            {t('google-ads.event-setting')}

            <Tooltip
              arrowPointAtCenter
              placement="top"
              onlyLink
              title={
                <Link
                  href="https://supportmeepshop.com/knowledgebase/google-ads??????????????????/"
                  target="_blank"
                >
                  <a href="https://supportmeepshop.com/knowledgebase/google-ads??????????????????/">
                    {t(`google-ads.event-setting-tip`)}
                  </a>
                </Link>
              }
            />
          </div>

          <div className={styles.row}>
            <div>{t('google-ads.sign-up')}</div>

            <div className={`${!googleAdwordsSignUp ? styles.empty : ''}`}>
              {googleAdwordsSignUp || t('google-ads.not-setting')}
            </div>
          </div>

          <div className={styles.row}>
            <div>{t('google-ads.begin-checkout')}</div>

            <div
              className={`${!googleAdwordsBeginCheckout ? styles.empty : ''}`}
            >
              {googleAdwordsBeginCheckout || t('google-ads.not-setting')}
            </div>
          </div>

          <div className={styles.row}>
            <div>{t('google-ads.purchase')}</div>

            <div className={`${!googleAdwordsPurchase ? styles.empty : ''}`}>
              {googleAdwordsPurchase || t('google-ads.not-setting')}
            </div>
          </div>
        </>
      )}

      <div className={styles.dpa}>
        {t('google-ads.dpa')}

        <Tooltip
          arrowPointAtCenter
          placement="top"
          onlyLink
          title={
            <Link
              href="https://supportmeepshop.com/knowledgebase/google-shopping-ads-google????????????/"
              target="_blank"
            >
              <a href="https://supportmeepshop.com/knowledgebase/google-shopping-ads-google????????????/">
                {t(`google-ads.dpa-tip`)}
              </a>
            </Link>
          }
        />
        <div>
          <div>{t('google-ads.dpa-description.0')}</div>
          <div>{t('google-ads.dpa-description.1')}</div>
        </div>
      </div>

      <Button
        disabled={!googleFeedsLink}
        onClick={() => {
          copyToClipboard(googleFeedsLink || '');
          setCopyTimes(copyTimes + 1);
        }}
      >
        {t('google-ads.copy-dpa-link')}
      </Button>
    </div>
  );
});
