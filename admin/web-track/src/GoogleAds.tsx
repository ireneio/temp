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

import useGtagList from './hooks/useGtagList';
import useClipboard from './hooks/useClipboard';
import styles from './styles/googleAds.less';

// graphql typescript
import { gtagTypeEnum, gtagEventNameEnum } from '../../../__generated__/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  adwordsConfigCode: string | null;
  signUpCode: string | null;
  beginCheckoutCode: string | null;
  purchaseCode: string | null;
  googleFeedsLink: string | null;
}

// definition
export const googleAdsStoreFragment = gql`
  fragment googleAdsStoreFragment on Store {
    id
    setting {
      googleFeedsLink
    }
  }
`;

const { Item } = Form;
const { TextArea } = Input;

export default Form.create<PropsType>()(
  React.memo(
    ({
      adwordsConfigCode,
      signUpCode,
      beginCheckoutCode,
      purchaseCode,
      googleFeedsLink,
      form,
    }: PropsType) => {
      const { t } = useTranslation('web-track');
      const [isOpen, openModal] = useState(false);
      const [editMode, setEditMode] = useState(false);
      const { setGtagSettingsList } = useGtagList();
      const { getFieldDecorator, validateFields, getFieldValue } = form;

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
            <img
              src={webTrackGoogleAdsInstruction}
              alt="GoogleAdsInstruction"
            />
          </Modal>

          <div className={styles.description}>
            {t('google-ads.description')}
          </div>

          {editMode ? (
            <div className={styles.item}>
              <Item label={t('google-ads.global-code')}>
                {getFieldDecorator('adwordsConfigCode', {
                  initialValue: adwordsConfigCode,
                  ...(getFieldValue('signUpCode') ||
                  getFieldValue('beginCheckoutCode') ||
                  getFieldValue('purchaseCode')
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
                  <Input
                    placeholder={t('google-ads.global-code-placeholder')}
                  />,
                )}
              </Item>

              <div>{t('google-ads.event-setting')}</div>

              <Item label={t('google-ads.sign-up')}>
                {getFieldDecorator('signUpCode', {
                  initialValue: signUpCode,
                })(
                  <TextArea placeholder={t('google-ads.event-placeholder')} />,
                )}
              </Item>

              <Item label={t('google-ads.begin-checkout')}>
                {getFieldDecorator('beginCheckoutCode', {
                  initialValue: beginCheckoutCode,
                })(
                  <TextArea placeholder={t('google-ads.event-placeholder')} />,
                )}
              </Item>

              <Item label={t('google-ads.purchase')}>
                {getFieldDecorator('purchaseCode', {
                  initialValue: purchaseCode,
                })(
                  <TextArea placeholder={t('google-ads.event-placeholder')} />,
                )}
              </Item>

              <div className={styles.button}>
                <Button
                  type="primary"
                  onClick={() => {
                    validateFields((errors, values) => {
                      if (!errors) {
                        setGtagSettingsList({
                          setInput: [
                            {
                              code: values.adwordsConfigCode,
                              type: 'google_adwords' as gtagTypeEnum,
                              eventName: 'adwords_config' as gtagEventNameEnum,
                            },
                            {
                              code: values.signUpCode,
                              type: 'google_adwords' as gtagTypeEnum,
                              eventName: 'sign_up' as gtagEventNameEnum,
                            },
                            {
                              code: values.beginCheckoutCode,
                              type: 'google_adwords' as gtagTypeEnum,
                              eventName: 'begin_checkout' as gtagEventNameEnum,
                            },
                            {
                              code: values.purchaseCode,
                              type: 'google_adwords' as gtagTypeEnum,
                              eventName: 'purchase' as gtagEventNameEnum,
                            },
                          ],
                        });
                        setEditMode(false);
                      }
                    });
                  }}
                >
                  {t('save')}
                </Button>
                <Button onClick={() => setEditMode(false)}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.value}>
              <Button onClick={() => setEditMode(true)}>
                {t('google-ads.setting')}
              </Button>

              <div>
                <div>{t('google-ads.global-code')}</div>
                <div>{adwordsConfigCode}</div>
              </div>

              <div>{t('google-ads.event-setting')}</div>

              <div className={styles.eventSetting}>
                <div>{t('google-ads.sign-up')}</div>
                <div className={`${!signUpCode && styles.noSetting}`}>
                  {signUpCode || t('google-ads.not-setting')}
                </div>
              </div>
              <div className={styles.eventSetting}>
                <div>{t('google-ads.begin-checkout')}</div>
                <div className={`${!beginCheckoutCode && styles.noSetting}`}>
                  {beginCheckoutCode || t('google-ads.not-setting')}
                </div>
              </div>
              <div className={styles.eventSetting}>
                <div>{t('google-ads.purchase')}</div>
                <div className={`${!purchaseCode && styles.noSetting}`}>
                  {purchaseCode || t('google-ads.not-setting')}
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
    },
  ),
);
