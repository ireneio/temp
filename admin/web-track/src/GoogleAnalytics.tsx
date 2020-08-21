// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Icon, Button, Modal, Form, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import {
  webTrackGoogleAnalytics_w224 as webTrackGoogleAnalytics,
  webTrackGoogleAnalyticsInstruction_w888 as webTrackGoogleAnalyticsInstruction,
} from '@meepshop/images';

import useSetGtagSettingsList from './hooks/useSetGtagSettingsList';
import styles from './styles/googleAnalytics.less';

// graphql typescript
import { googleAnalyticsFragment as googleAnalyticsFragmentType } from './__generated__/googleAnalyticsFragment';
import { updateGoogleAnalyticsCache } from './__generated__/updateGoogleAnalyticsCache';
import { gtagTypeEnum, gtagEventNameEnum } from '../../../__generated__/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  store: googleAnalyticsFragmentType;
}

// definition
export const googleAnalyticsFragment = gql`
  fragment googleAnalyticsFragment on Store {
    id
    adTrack @client {
      googleAnalyticsId
    }
  }
`;

const { Item } = Form;

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator, validateFields } = form;
    const {
      id,
      adTrack: { googleAnalyticsId },
    } = store;
    const { t } = useTranslation('web-track');
    const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
      cache.writeFragment<updateGoogleAnalyticsCache>({
        id: id || 'null-id' /** TODO: should be not null */,
        fragment: gql`
          fragment updateGoogleAnalyticsCache on Store {
            id
            adTrack @client {
              googleAnalyticsId
            }
          }
        `,
        data: {
          __typename: 'Store',
          id: id || 'null-id' /** TODO: should be not null */,
          adTrack: {
            __typename: 'StoreAdTrack',
            googleAnalyticsId: data?.setGtagSettingsList?.[0]?.code || null,
          },
        },
      });
    });
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    return (
      <div>
        <img src={webTrackGoogleAnalytics} alt="GoogleAnalytics" />

        <div className={styles.title}>
          <div>{t('google-analytics.title')}</div>
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
            src={webTrackGoogleAnalyticsInstruction}
            alt="GoogleAnalyticsInstruction"
          />
        </Modal>

        <div className={styles.description}>
          {t('google-analytics.description')}
        </div>

        {editMode ? (
          <div className={styles.item}>
            <Item>
              {getFieldDecorator('googleAnalyticsId', {
                initialValue: googleAnalyticsId,
              })(
                <Input
                  placeholder={t('google-analytics.setting-placeholder')}
                />,
              )}
            </Item>
            <Button
              type="primary"
              onClick={() => {
                validateFields(async (errors, values) => {
                  if (errors) return;

                  await setGtagSettingsList({
                    variables: {
                      setInput: [
                        {
                          code: values.googleAnalyticsId,
                          type: 'google_analytics' as gtagTypeEnum,
                          eventName: 'analytics_config' as gtagEventNameEnum,
                          trackingId: values.googleAnalyticsId,
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
        ) : (
          <>
            {googleAnalyticsId ? (
              <div className={styles.googleAnalyticsId}>
                <div>{t('google-analytics.googleAnalyticsId')}</div>
                <div>{googleAnalyticsId}</div>
                <Icon type="edit" onClick={() => setEditMode(true)} />
              </div>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                {t('google-analytics.setting')}
              </Button>
            )}
          </>
        )}
      </div>
    );
  }),
);
