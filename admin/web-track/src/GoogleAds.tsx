// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Button, Modal, Form, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import {
  webTrackGoogleAds_w172 as webTrackGoogleAds,
  webTrackGoogleAdsInstruction_w890 as webTrackGoogleAdsInstruction,
} from '@meepshop/images';

import useClipboard from './hooks/useClipboard';
import useSetGtagSettingsList from './hooks/useSetGtagSettingsList';
import styles from './styles/googleAds.less';

// graphql typescript
import { googleAdsFragment as googleAdsFragmentType } from './__generated__/googleAdsFragment';
import { updateGoogleAdsCache } from './__generated__/updateGoogleAdsCache';
import { gtagTypeEnum, gtagEventNameEnum } from '../../../__generated__/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  store: googleAdsFragmentType;
}

// definition
export const googleAdsFragment = gql`
  fragment googleAdsFragment on Store {
    id
    setting {
      googleFeedsLink
    }
    adTrack @client {
      googleAdwordsConfig {
        raw
      }
      googleAdwordsSignUp {
        raw
      }
      googleAdwordsBeginCheckout {
        raw
      }
      googleAdwordsPurchase {
        raw
      }
    }
  }
`;

const { Item } = Form;
const { TextArea } = Input;

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator, validateFields, getFieldValue } = form;
    const {
      id,
      adTrack: {
        googleAdwordsConfig,
        googleAdwordsSignUp,
        googleAdwordsBeginCheckout,
        googleAdwordsPurchase,
      },
    } = store;
    const googleFeedsLink = store.setting?.googleFeedsLink;
    const { t } = useTranslation('web-track');
    const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
      cache.writeFragment<updateGoogleAdsCache>({
        id: id || 'null-id' /** TODO: should be not null */,
        fragment: gql`
          fragment updateGoogleAdsCache on Store {
            id
            adTrack @client {
              googleAdwordsConfig {
                raw
              }
              googleAdwordsSignUp {
                raw
              }
              googleAdwordsBeginCheckout {
                raw
              }
              googleAdwordsPurchase {
                raw
              }
            }
          }
        `,
        data: {
          __typename: 'Store',
          id: id || 'null-id' /** TODO: should be not null */,
          adTrack: {
            __typename: 'StoreAdTrack',
            googleAdwordsConfig: {
              __typename: 'AdTrackCode',
              raw:
                data?.setGtagSettingsList?.find(
                  gtag => gtag?.eventName === 'adwords_config',
                )?.code || null,
            },
            googleAdwordsSignUp: {
              __typename: 'AdTrackCode',
              raw:
                data?.setGtagSettingsList?.find(
                  gtag => gtag?.eventName === 'sign_up',
                )?.code || null,
            },
            googleAdwordsBeginCheckout: {
              __typename: 'AdTrackCode',
              raw:
                data?.setGtagSettingsList?.find(
                  gtag => gtag?.eventName === 'begin_checkout',
                )?.code || null,
            },
            googleAdwordsPurchase: {
              __typename: 'AdTrackCode',
              raw:
                data?.setGtagSettingsList?.find(
                  gtag => gtag?.eventName === 'purchase',
                )?.code || null,
            },
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

        {editMode ? (
          <div className={styles.item}>
            <Item label={t('google-ads.global-code')}>
              {getFieldDecorator('googleAdwordsConfig', {
                initialValue: googleAdwordsConfig.raw,
                ...(getFieldValue('googleAdwordsSignUp') ||
                getFieldValue('googleAdwordsBeginCheckout') ||
                getFieldValue('googleAdwordsPurchase')
                  ? {
                      rules: [
                        {
                          required: true,
                          message: t('required'),
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
                initialValue: googleAdwordsSignUp.raw,
              })(<TextArea placeholder={t('google-ads.event-placeholder')} />)}
            </Item>

            <Item label={t('google-ads.begin-checkout')}>
              {getFieldDecorator('googleAdwordsBeginCheckout', {
                initialValue: googleAdwordsBeginCheckout.raw,
              })(<TextArea placeholder={t('google-ads.event-placeholder')} />)}
            </Item>

            <Item label={t('google-ads.purchase')}>
              {getFieldDecorator('googleAdwordsPurchase', {
                initialValue: googleAdwordsPurchase.raw,
              })(<TextArea placeholder={t('google-ads.event-placeholder')} />)}
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
                            code: values.googleAdwordsConfig,
                            type: 'google_adwords' as gtagTypeEnum,
                            eventName: 'adwords_config' as gtagEventNameEnum,
                            trackingId:
                              values.googleAdwordsConfig?.match(
                                /['"](AW-[0-9]+)['"]/,
                              )?.[1] || null,
                          },
                          {
                            code: values.googleAdwordsSignUp,
                            type: 'google_adwords' as gtagTypeEnum,
                            eventName: 'sign_up' as gtagEventNameEnum,
                            trackingId:
                              values.googleAdwordsSignUp?.match(
                                /['"](AW-[\w/-]+)['"]/,
                              )?.[1] || null,
                          },
                          {
                            code: values.googleAdwordsBeginCheckout,
                            type: 'google_adwords' as gtagTypeEnum,
                            eventName: 'begin_checkout' as gtagEventNameEnum,
                            trackingId:
                              values.googleAdwordsBeginCheckout?.match(
                                /['"](AW-[\w/-]+)['"]/,
                              )?.[1] || null,
                          },
                          {
                            code: values.googleAdwordsPurchase,
                            type: 'google_adwords' as gtagTypeEnum,
                            eventName: 'purchase' as gtagEventNameEnum,
                            trackingId:
                              values.googleAdwordsPurchase?.match(
                                /['"](AW-[\w/-]+)['"]/,
                              )?.[1] || null,
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
              <div>{googleAdwordsConfig.raw}</div>
            </div>

            <div>{t('google-ads.event-setting')}</div>

            <div className={styles.eventSetting}>
              <div>{t('google-ads.sign-up')}</div>
              <div
                className={`${!googleAdwordsSignUp.raw && styles.noSetting}`}
              >
                {googleAdwordsSignUp.raw || t('google-ads.not-setting')}
              </div>
            </div>
            <div className={styles.eventSetting}>
              <div>{t('google-ads.begin-checkout')}</div>
              <div
                className={`${!googleAdwordsBeginCheckout.raw &&
                  styles.noSetting}`}
              >
                {googleAdwordsBeginCheckout.raw || t('google-ads.not-setting')}
              </div>
            </div>
            <div className={styles.eventSetting}>
              <div>{t('google-ads.purchase')}</div>
              <div
                className={`${!googleAdwordsPurchase.raw && styles.noSetting}`}
              >
                {googleAdwordsPurchase.raw || t('google-ads.not-setting')}
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
