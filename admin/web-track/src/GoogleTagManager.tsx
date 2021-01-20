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

import useSetGtagSettingsList from './hooks/useSetGtagSettingsList';
import styles from './styles/googleTagManager.less';

// graphql typescript
import {
  gtagTypeEnum,
  gtagEventNameEnum,
  googleTagManagerFragment as googleTagManagerFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { googleTagManagerFragment } from './gqls/googleTagManager';

// typescript definition
interface PropsType extends FormComponentProps {
  store: googleTagManagerFragmentType;
}

// definition
const { Item } = Form;
const { TextArea } = Input;
const parseGoogleTagManager = (value: string | null): string | null =>
  value?.match(/id=(GTM-[\w/-]+)[&'"]/)?.[1] ||
  value?.match(/^(GTM-[\w/-]+)$/)?.[1] ||
  null;

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator, validateFields } = form;
    const {
      id,
      adTracks: { googleTagManager },
    } = store;
    const { t } = useTranslation('web-track');
    const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
      cache.writeFragment<googleTagManagerFragmentType>({
        id: id || 'null-id' /** SHOULD_NOT_BE_NULL */,
        fragment: googleTagManagerFragment,
        data: {
          __typename: 'Store',
          id: id || 'null-id' /** SHOULD_NOT_BE_NULL */,
          adTracks: {
            __typename: 'AdTracks',
            googleTagManager:
              data?.setGtagSettingsList?.[0]?.trackingId || null,
          },
        },
      });
    });
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

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

        <div className={styles.warning}>
          <Icon type="exclamation-circle" />

          {t('google-tag-manager.warning')}
        </div>

        {editMode ? (
          <div className={styles.edit}>
            {t('google-tag-manager.googleTagManager')}
            <Item>
              {getFieldDecorator('googleTagManager', {
                initialValue: googleTagManager,
                rules: [
                  {
                    validator: (_, value, callback) => {
                      if (value && !parseGoogleTagManager(value))
                        callback(t('google-tag-manager.parse-fail'));
                      else callback();
                    },
                  },
                ],
              })(
                <TextArea
                  placeholder={t('google-tag-manager.setting-placeholder')}
                  autoSize={{ minRows: 1, maxRows: 4 }}
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
                          type: 'google_tag_manager' as gtagTypeEnum,
                          eventName: 'tag_manager' as gtagEventNameEnum,
                          trackingId: parseGoogleTagManager(
                            values.googleTagManager,
                          ),
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
            {googleTagManager ? (
              <div className={styles.googleTagManager}>
                <div>
                  {t('google-tag-manager.googleTagManager')}
                  <Icon type="edit" onClick={() => setEditMode(true)} />
                </div>
                <div>{googleTagManager}</div>
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
