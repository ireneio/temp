// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Icon } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import {
  webTrackGoogleAds_w172 as webTrackGoogleAds,
  webTrackGoogleAdsInstruction_w890 as webTrackGoogleAdsInstruction,
} from '@meepshop/images';

import useClipboard from './hooks/useClipboard';
import useSetGtagSettingsList from './hooks/useSetGtagSettingsList';
import styles from './styles/googleAds.less';

// graphql typescript
import {
  gtagTypeEnum,
  gtagEventNameEnum,
  googleAdsStoreFragment as googleAdsStoreFragmentType,
  googleAdsStoreUpdateCacheFragment as googleAdsStoreUpdateCacheFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { googleAdsStoreUpdateCacheFragment } from './gqls/googleAds';

// typescript definition
interface PropsType extends FormComponentProps {
  store: googleAdsStoreFragmentType;
}

// definition
const { Item } = Form;
const { TextArea } = Input;
const parseGoogleAdwordsConfig = (value: string | null): string | null =>
  value?.match(/['"](AW-[0-9]+)['"]/)?.[1] ||
  value?.match(/^(AW-[0-9]+)$/)?.[1] ||
  null;
const parseGoogleAdsCode = (value: string | null): string | null =>
  value?.match(/['"](AW-[\w/-]+)['"]/)?.[1] ||
  value?.match(/^(AW-[\w/-]+)$/)?.[1] ||
  null;

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator, validateFields, getFieldValue } = form;
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
    const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
      cache.writeFragment<googleAdsStoreUpdateCacheFragmentType>({
        id: id || 'null-id' /** SHOULD_NOT_BE_NULL */,
        fragment: googleAdsStoreUpdateCacheFragment,
        data: {
          __typename: 'Store',
          id: id || 'null-id' /** SHOULD_NOT_BE_NULL */,
          adTracks: {
            __typename: 'AdTracks',
            googleAdwordsConfig:
              data?.setGtagSettingsList?.find(
                gtag => gtag?.eventName === 'adwords_config',
              )?.trackingId || null,
            googleAdwordsSignUp:
              data?.setGtagSettingsList?.find(
                gtag => gtag?.eventName === 'sign_up',
              )?.trackingId || null,
            googleAdwordsBeginCheckout:
              data?.setGtagSettingsList?.find(
                gtag => gtag?.eventName === 'begin_checkout',
              )?.trackingId || null,
            googleAdwordsPurchase:
              data?.setGtagSettingsList?.find(
                gtag => gtag?.eventName === 'purchase',
              )?.trackingId || null,
          },
        },
      });
    });
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

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
          <Icon type="exclamation-circle" />

          {t('google-ads.warning')}
        </div>

        {editMode ? (
          <div className={styles.item}>
            <Item label={t('google-ads.global-code')}>
              {getFieldDecorator('googleAdwordsConfig', {
                initialValue: googleAdwordsConfig,
                ...(getFieldValue('googleAdwordsSignUp') ||
                getFieldValue('googleAdwordsBeginCheckout') ||
                getFieldValue('googleAdwordsPurchase')
                  ? {
                      rules: [
                        {
                          required: true,
                          message: t('required'),
                        },
                        {
                          validator: (_, value, callback) => {
                            if (value && !parseGoogleAdwordsConfig(value))
                              callback(t('google-ads.parse-config-fail'));
                            else callback();
                          },
                        },
                      ],
                    }
                  : {}),
                validateTrigger: 'onBlur',
              })(
                <Input placeholder={t('google-ads.global-code-placeholder')} />,
              )}
            </Item>

            <div>{t('google-ads.event-setting')}</div>

            <Item label={t('google-ads.sign-up')}>
              {getFieldDecorator('googleAdwordsSignUp', {
                initialValue: googleAdwordsSignUp,
                rules: [
                  {
                    validator: (_, value, callback) => {
                      if (value && !parseGoogleAdsCode(value))
                        callback(t('google-ads.parse-fail'));
                      else callback();
                    },
                  },
                ],
              })(
                <TextArea
                  placeholder={t('google-ads.event-placeholder')}
                  autoSize={{ minRows: 1, maxRows: 4 }}
                />,
              )}
            </Item>

            <Item label={t('google-ads.begin-checkout')}>
              {getFieldDecorator('googleAdwordsBeginCheckout', {
                initialValue: googleAdwordsBeginCheckout,
                rules: [
                  {
                    validator: (_, value, callback) => {
                      if (value && !parseGoogleAdsCode(value))
                        callback(t('google-ads.parse-fail'));
                      else callback();
                    },
                  },
                ],
              })(
                <TextArea
                  placeholder={t('google-ads.event-placeholder')}
                  autoSize={{ minRows: 1, maxRows: 4 }}
                />,
              )}
            </Item>

            <Item label={t('google-ads.purchase')}>
              {getFieldDecorator('googleAdwordsPurchase', {
                initialValue: googleAdwordsPurchase,
                rules: [
                  {
                    validator: (_, value, callback) => {
                      if (value && !parseGoogleAdsCode(value))
                        callback(t('google-ads.parse-fail'));
                      else callback();
                    },
                  },
                ],
              })(
                <TextArea
                  placeholder={t('google-ads.event-placeholder')}
                  autoSize={{ minRows: 1, maxRows: 4 }}
                />,
              )}
            </Item>

            <div className={styles.button}>
              <Button
                type="primary"
                onClick={() => {
                  validateFields(async (errors, values) => {
                    if (errors) return;

                    await setGtagSettingsList({
                      variables: {
                        setInput: [
                          {
                            type: 'google_adwords' as gtagTypeEnum,
                            eventName: 'adwords_config' as gtagEventNameEnum,
                            trackingId: parseGoogleAdwordsConfig(
                              values.googleAdwordsConfig,
                            ),
                          },
                          {
                            type: 'google_adwords' as gtagTypeEnum,
                            eventName: 'sign_up' as gtagEventNameEnum,
                            trackingId: parseGoogleAdsCode(
                              values.googleAdwordsSignUp,
                            ),
                          },
                          {
                            type: 'google_adwords' as gtagTypeEnum,
                            eventName: 'begin_checkout' as gtagEventNameEnum,
                            trackingId: parseGoogleAdsCode(
                              values.googleAdwordsBeginCheckout,
                            ),
                          },
                          {
                            type: 'google_adwords' as gtagTypeEnum,
                            eventName: 'purchase' as gtagEventNameEnum,
                            trackingId: parseGoogleAdsCode(
                              values.googleAdwordsPurchase,
                            ),
                          },
                        ],
                      },
                    });
                    setEditMode(false);
                  });
                }}
              >
                {t('save')}
              </Button>
              <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
            </div>
          </div>
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
            <div>{t('google-ads.dpa-description-1')}</div>
            <div>{t('google-ads.dpa-description-2')}</div>
          </div>
        </div>

        <Button disabled={!googleFeedsLink} id="googleFeedsLink">
          {t('google-ads.copy-dpa-link')}
        </Button>
      </div>
    );
  }),
);
