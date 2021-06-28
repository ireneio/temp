// import
import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Form, Button, Modal, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import {
  webTrackGoogle_w98 as webTrackGoogle,
  webTrackGoogleWebmasterInstruction_w890 as webTrackGoogleWebmasterInstruction,
} from '@meepshop/images';

import useUpdateGoogleSearchConsoleVerificationHtml from './hooks/useUpdateGoogleSearchConsoleVerificationHtml';
import styles from './styles/googleWebmaster.less';

// graphql typescript
import { googleWebmasterFragment as googleWebmasterFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: googleWebmasterFragmentType;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ store }: PropsType) => {
  const {
    id,
    adTracks: { googleSearchConsoleVerificationHtml },
  } = store;
  const { t } = useTranslation('web-track');
  const [isOpen, openModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const updateGoogleSearchConsoleVerificationHtml = useUpdateGoogleSearchConsoleVerificationHtml(
    id || 'null-id' /* SHOULD_NOT_BE_NULL */,
    setEditMode,
  );

  return (
    <div>
      <img className={styles.logo} src={webTrackGoogle} alt="GoogleWebmaster" />

      <span className={styles.logoText}>{t('google-webmaster.webmaster')}</span>

      <div className={styles.title}>
        <div>{t('google-webmaster.webmaster')}</div>

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
          src={webTrackGoogleWebmasterInstruction}
          alt="GoogleWebmasterInstruction"
        />
      </Modal>

      <div className={styles.description}>
        {t('google-webmaster.description')}
      </div>

      {editMode ? (
        <Form
          className={styles.item}
          onFinish={updateGoogleSearchConsoleVerificationHtml}
        >
          <FormItem
            name={['googleSearchConsoleVerificationHtml']}
            initialValue={googleSearchConsoleVerificationHtml}
          >
            <Input placeholder={t('google-webmaster.setting-placeholder')} />
          </FormItem>

          <Button type="primary" htmlType="submit">
            {t('save')}
          </Button>

          <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
        </Form>
      ) : (
        <>
          {googleSearchConsoleVerificationHtml ? (
            <div className={styles.googleSearchConsoleVerificationHtml}>
              <div>
                {t('google-webmaster.googleSearchConsoleVerificationHtml')}
              </div>

              <div>{googleSearchConsoleVerificationHtml}</div>

              <EditOutlined onClick={() => setEditMode(true)} />
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              {t('google-webmaster.setting')}
            </Button>
          )}
        </>
      )}
    </div>
  );
});
