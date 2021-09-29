// import
import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Form, Button, Modal, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import {
  webTrackGoogleAnalytics_w224 as webTrackGoogleAnalytics,
  webTrackGoogleAnalyticsInstruction_w888 as webTrackGoogleAnalyticsInstruction,
} from '@meepshop/images';

import useUpdateGoogleAnalytics from './hooks/useUpdateGoogleAnalytics';
import styles from './styles/googleAnalytics.less';

// graphql typescript
import { googleAnalyticsFragment as googleAnalyticsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: googleAnalyticsFragmentType;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ store }: PropsType) => {
  const {
    id,
    adTracks: { googleAnalyticsId },
  } = store;
  const { t } = useTranslation('web-track');
  const [isOpen, openModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const updateGoogleAnalytics = useUpdateGoogleAnalytics(id, setEditMode);

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
        <Form className={styles.item} onFinish={updateGoogleAnalytics}>
          <FormItem
            name={['googleAnalyticsId']}
            initialValue={googleAnalyticsId}
          >
            <Input placeholder={t('google-analytics.setting-placeholder')} />
          </FormItem>

          <Button type="primary" htmlType="submit">
            {t('save')}
          </Button>

          <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
        </Form>
      ) : (
        <>
          {googleAnalyticsId ? (
            <div className={styles.googleAnalyticsId}>
              <div>{t('google-analytics.googleAnalyticsId')}</div>
              <div>{googleAnalyticsId}</div>
              <EditOutlined onClick={() => setEditMode(true)} />
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
});
