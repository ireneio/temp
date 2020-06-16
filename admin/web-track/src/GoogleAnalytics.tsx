// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { Tooltip, Icon, Button, Modal, Form, Input } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import getImage, {
  webTrackGoogleAnalytics_w224 as webTrackGoogleAnalytics,
  webTrackGoogleAnalyticsInstruction_w888 as webTrackGoogleAnalyticsInstruction,
} from '@meepshop/images';

import useGtagList from './hooks/useGtagList';

import styles from './styles/googleAnalytics.less';

// graphql typescript
import { gtagTypeEnum, gtagEventNameEnum } from '../../../__generated__/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  code: string | null;
}

// definition
const { Item } = Form;

export default Form.create<PropsType>()(
  React.memo(({ code, form }: PropsType) => {
    const { t } = useTranslation('web-track');
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const { setGtagSettingsList } = useGtagList();

    const { getFieldDecorator, validateFields } = form;

    return (
      <div>
        <img src={getImage(webTrackGoogleAnalytics)} alt="GoogleAnalytics" />

        <div className={styles.title}>
          <div>{t('google-analytics.title')}</div>
          <Tooltip arrowPointAtCenter placement="bottomLeft" title={t('tip')}>
            <Icon type="question-circle-o" onClick={() => openModal(true)} />
          </Tooltip>
        </div>

        <Modal
          width="fit-content"
          footer={null}
          visible={isOpen}
          onCancel={() => openModal(false)}
        >
          <img
            src={getImage(webTrackGoogleAnalyticsInstruction)}
            alt="GoogleAnalyticsInstruction"
          />
        </Modal>

        <div className={styles.description}>
          {t('google-analytics.description')}
        </div>

        {editMode ? (
          <div className={styles.item}>
            <Item>
              {getFieldDecorator('code', {
                initialValue: code,
              })(
                <Input
                  placeholder={t('google-analytics.setting-placeholder')}
                />,
              )}
            </Item>
            <Button
              type="primary"
              onClick={() => {
                validateFields((errors, values) => {
                  if (!errors) {
                    setGtagSettingsList({
                      setInput: [
                        {
                          code: values.code,
                          type: 'google_analytics' as gtagTypeEnum,
                          eventName: 'analytics_config' as gtagEventNameEnum,
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
            <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
          </div>
        ) : (
          <>
            {code ? (
              <div className={styles.code}>
                <div>{t('google-analytics.code')}</div>
                <div>{code}</div>
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
