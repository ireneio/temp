// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { Icon, Button, Modal, Form, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import {
  webTrackGoogleTagManager_w172 as webTrackGoogleTagManager,
  webTrackGoogleTagManagerInstruction_w890 as webTrackGoogleTagManagerInstruction,
} from '@meepshop/images';

import useWebTrackList from './hooks/useWebTrackList';

import styles from './styles/googleTagManager.less';

// graphql typescript
import { getWebTrack_getWebTrackList_data as getWebTrackGetWebTrackListData } from './__generated__/getWebTrack';

// typescript definition
interface PropsType extends FormComponentProps {
  webTrack: getWebTrackGetWebTrackListData | null;
}

// definition
const { Item } = Form;
const { TextArea } = Input;

export default Form.create<PropsType>()(
  React.memo(({ webTrack, form }: PropsType) => {
    const { t } = useTranslation('web-track');
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const { updateWebTrackList } = useWebTrackList();

    const id = webTrack?.id || '';
    const trackCode = webTrack?.trackPage?.[0]?.trackCode;
    const { getFieldDecorator, validateFields } = form;

    return (
      <div>
        <img src={webTrackGoogleTagManager} alt="GoogleTagManager" />

        <div className={styles.title}>
          <div>{t('google-tag-manager.title')}</div>
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
            src={webTrackGoogleTagManagerInstruction}
            alt="GoogleTagManagerInstruction"
          />
        </Modal>

        <div className={styles.description}>
          {t('google-tag-manager.description')}
        </div>

        {editMode ? (
          <div className={styles.edit}>
            {t('google-tag-manager.trackCode')}
            <Item>
              {getFieldDecorator('trackCode', {
                initialValue: trackCode,
              })(
                <TextArea
                  rows={5}
                  placeholder={t('google-tag-manager.setting-placeholder')}
                />,
              )}
            </Item>
            <Button
              type="primary"
              onClick={() => {
                validateFields((errors, values) => {
                  if (!errors) {
                    updateWebTrackList({
                      updateWebTrackList: [
                        {
                          id,
                          trackPage: [
                            {
                              trackCode: values.trackCode,
                            },
                          ],
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
            {trackCode ? (
              <div className={styles.trackCode}>
                <div>
                  {t('google-tag-manager.trackCode')}
                  <Icon type="edit" onClick={() => setEditMode(true)} />
                </div>
                <div>{trackCode}</div>
              </div>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                {t('google-tag-manager.setting')}
              </Button>
            )}
          </>
        )}
      </div>
    );
  }),
);
