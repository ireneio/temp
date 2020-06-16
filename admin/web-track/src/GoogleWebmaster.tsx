// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { Tooltip, Icon, Button, Modal, Form, Input } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';
import getImage, {
  webTrackGoogle_w98 as webTrackGoogle,
  webTrackGoogleWebmasterInstruction_w890 as webTrackGoogleWebmasterInstruction,
} from '@meepshop/images';

import useWebTrackList from './hooks/useWebTrackList';

import styles from './styles/googleWebmaster.less';

// graphql typescript
import { getWebTrack_getWebTrackList_data as getWebTrackGetWebTrackListData } from './__generated__/getWebTrack';

// typescript definition
interface PropsType extends FormComponentProps {
  webTrack: getWebTrackGetWebTrackListData | null;
}

// definition
const { Item } = Form;

export default Form.create<PropsType>()(
  React.memo(({ webTrack, form }: PropsType) => {
    const { t } = useTranslation('web-track');
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const { updateWebTrackList } = useWebTrackList();

    const id = webTrack?.id || '';
    const trackId = webTrack?.trackId;
    const { getFieldDecorator, validateFields } = form;

    return (
      <div>
        <img src={getImage(webTrackGoogle)} alt="GoogleWebmaster" />
        <span className={styles.logoText}>
          {t('google-webmaster.webmaster')}
        </span>

        <div className={styles.title}>
          <div>{t('google-webmaster.webmaster')}</div>
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
            src={getImage(webTrackGoogleWebmasterInstruction)}
            alt="GoogleWebmasterInstruction"
          />
        </Modal>

        <div className={styles.description}>
          {t('google-webmaster.description')}
        </div>

        {editMode ? (
          <div className={styles.item}>
            <Item>
              {getFieldDecorator('trackId', {
                initialValue: trackId,
              })(
                <Input
                  placeholder={t('google-webmaster.setting-placeholder')}
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
                          trackId: values.trackId,
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
            {trackId ? (
              <div className={styles.trackId}>
                <div>{t('google-webmaster.trackId')}</div>
                <div>{trackId}</div>
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
