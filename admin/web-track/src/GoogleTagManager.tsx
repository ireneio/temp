// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import gql from 'graphql-tag';
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
import { googleTagManagerFragment as googleTagManagerFragmentType } from './__generated__/googleTagManagerFragment';
import { updateGoogleTagManagerCache } from './__generated__/updateGoogleTagManagerCache';
import { gtagTypeEnum, gtagEventNameEnum } from '../../../__generated__/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  store: googleTagManagerFragmentType;
}

// definition
export const googleTagManagerFragment = gql`
  fragment googleTagManagerFragment on Store {
    id
    adTrack @client {
      googleTagManager {
        raw
      }
    }
  }
`;

const { Item } = Form;
const { TextArea } = Input;

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator, validateFields } = form;
    const {
      id,
      adTrack: { googleTagManager },
    } = store;
    const { t } = useTranslation('web-track');
    const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
      cache.writeFragment<updateGoogleTagManagerCache>({
        id: id || 'null-id' /** SHOULD_NOT_BE_NULL */,
        fragment: gql`
          fragment updateGoogleTagManagerCache on Store {
            id
            adTrack @client {
              googleTagManager {
                raw
              }
            }
          }
        `,
        data: {
          __typename: 'Store',
          id: id || 'null-id' /** SHOULD_NOT_BE_NULL */,
          adTrack: {
            __typename: 'StoreAdTrack',
            googleTagManager: {
              __typename: 'AdTrackCode',
              raw: data?.setGtagSettingsList?.[0]?.code || null,
            },
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

        {editMode ? (
          <div className={styles.edit}>
            {t('google-tag-manager.googleTagManager')}
            <Item>
              {getFieldDecorator('googleTagManager', {
                initialValue: googleTagManager.raw,
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
                validateFields(async (errors, values) => {
                  if (errors) return;

                  await setGtagSettingsList({
                    variables: {
                      setInput: [
                        {
                          code: values.googleTagManager,
                          type: 'google_tag_manager' as gtagTypeEnum,
                          eventName: 'tag_manager' as gtagEventNameEnum,
                          trackingId:
                            values.googleTagManager.match(
                              /id=(GTM-[\w/-]+)[&'"]/,
                            )?.[1] || null,
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
            {googleTagManager.raw ? (
              <div className={styles.googleTagManager}>
                <div>
                  {t('google-tag-manager.googleTagManager')}
                  <Icon type="edit" onClick={() => setEditMode(true)} />
                </div>
                <div>{googleTagManager.raw}</div>
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
