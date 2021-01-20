// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { Icon, Button, Modal, Form, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import {
  webTrackGoogle_w98 as webTrackGoogle,
  webTrackGoogleWebmasterInstruction_w890 as webTrackGoogleWebmasterInstruction,
} from '@meepshop/images';

import useUpdateGoogleSearchConsoleVerificationHtml from './hooks/useUpdateGoogleSearchConsoleVerificationHtml';
import styles from './styles/googleWebmaster.less';

// graphql typescript
import { googleWebmasterFragment as googleWebmasterFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  store: googleWebmasterFragmentType;
}

// definition
const { Item } = Form;

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator } = form;
    const {
      id,
      adTracks: { googleSearchConsoleVerificationHtml },
    } = store;
    const { t } = useTranslation('web-track');
    const updateGoogleSearchConsoleVerificationHtml = useUpdateGoogleSearchConsoleVerificationHtml(
      id || 'null-id' /** SHOULD_NOT_BE_NULL */,
      form,
    );
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    return (
      <div>
        <img
          className={styles.logo}
          src={webTrackGoogle}
          alt="GoogleWebmaster"
        />
        <span className={styles.logoText}>
          {t('google-webmaster.webmaster')}
        </span>

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
          <div className={styles.item}>
            <Item>
              {getFieldDecorator('googleSearchConsoleVerificationHtml', {
                initialValue: googleSearchConsoleVerificationHtml,
              })(
                <Input
                  placeholder={t('google-webmaster.setting-placeholder')}
                />,
              )}
            </Item>
            <Button
              type="primary"
              onClick={async () => {
                if (await updateGoogleSearchConsoleVerificationHtml())
                  setEditMode(false);
              }}
            >
              {t('save')}
            </Button>
            <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
          </div>
        ) : (
          <>
            {googleSearchConsoleVerificationHtml ? (
              <div className={styles.googleSearchConsoleVerificationHtml}>
                <div>
                  {t('google-webmaster.googleSearchConsoleVerificationHtml')}
                </div>
                <div>{googleSearchConsoleVerificationHtml}</div>
                <Icon type="edit" onClick={() => setEditMode(true)} />
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
  }),
);
