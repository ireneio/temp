// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
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
import { gtagTypeEnum, gtagEventNameEnum } from '../../../__generated__/admin';
import { googleAnalyticsFragment as googleAnalyticsFragmentType } from './gqls/__generated__/googleAnalyticsFragment';

// graphql import
import { googleAnalyticsFragment } from './gqls/googleAnalytics';

// typescript definition
interface PropsType extends FormComponentProps {
  store: googleAnalyticsFragmentType;
}

// definition
const { Item } = Form;

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator, validateFields } = form;
    const {
      id,
      adTracks: { googleAnalyticsId },
    } = store;
    const { t } = useTranslation('web-track');
    const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
      cache.writeFragment<googleAnalyticsFragmentType>({
        id: id || 'null-id' /** SHOULD_NOT_BE_NULL */,
        fragment: googleAnalyticsFragment,
        data: {
          __typename: 'Store',
          id: id || 'null-id' /** SHOULD_NOT_BE_NULL */,
          adTracks: {
            __typename: 'AdTracks',
            googleAnalyticsId:
              data?.setGtagSettingsList?.[0]?.trackingId || null,
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
