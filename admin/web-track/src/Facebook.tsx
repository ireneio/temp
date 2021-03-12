// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState } from 'react';
import { Tooltip as AntdTooltip, Icon, Button, Modal, Form, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import {
  webTrackFacebook_w130 as webTrackFacebook,
  webTrackFacebookPixelInstruction_w890 as webTrackFacebookPixelInstruction,
} from '@meepshop/images';

import useSetFbPixel from './hooks/useSetFbPixel';
import useClipboard from './hooks/useClipboard';
import styles from './styles/facebook.less';

// graphql typescript
import { facebookStoreFragment as facebookStoreFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  store: facebookStoreFragmentType;
}

// definition
const { Item } = Form;

export default Form.create<PropsType>()(
  React.memo(({ form, store }: PropsType) => {
    const { getFieldDecorator, validateFields } = form;
    const {
      id,
      adTracks: { facebookPixelId },
    } = store;
    const fbDPALink = store.setting?.fbDPALink || null;
    const { t } = useTranslation('web-track');
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const setFbPixel = useSetFbPixel(id || 'null-id' /** SHOULD_NOT_BE_NULL */);

    useClipboard(fbDPALink || '', '#fbDPALink', t('facebook-pixel.copied'));

    return (
      <div>
        <img src={webTrackFacebook} alt="facebook" />

        <div className={styles.title}>
          <div>{t('facebook-pixel.title')}</div>
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
            src={webTrackFacebookPixelInstruction}
            alt="FacebookPixelInstruction"
          />
        </Modal>

        {editMode ? (
          <Item className={styles.item}>
            {getFieldDecorator('facebookPixelId', {
              initialValue: facebookPixelId,
              rules: [
                {
                  required: true,
                  message: t('required'),
                },
                {
                  pattern: /^(\d{15}|\d{16})$/,
                  message: t('facebook-pixel.error'),
                },
              ],
              validateTrigger: 'onBlur',
            })(<Input />)}

            <Button
              type="primary"
              onClick={() => {
                validateFields(async (errors, values) => {
                  if (errors) return;

                  setFbPixel({
                    variables: {
                      input: {
                        pixelId: values.facebookPixelId,
                      },
                    },
                  });
                  setEditMode(false);
                });
              }}
            >
              {t('save')}
            </Button>
            <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
          </Item>
        ) : (
          <>
            {facebookPixelId ? (
              <div className={styles.pixelNo}>
                <div>{t('facebook-pixel.pixel-no')}</div>
                <div>{facebookPixelId}</div>
                <Icon type="edit" onClick={() => setEditMode(true)} />
              </div>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                {t('facebook-pixel.setting')}
              </Button>
            )}
          </>
        )}

        <div className={styles.dpa}>
          {t('facebook-pixel.dpa')}
          <div>
            <div>{t('facebook-pixel.dpa-description-1')}</div>
            <div>{t('facebook-pixel.dpa-description-2')}</div>
          </div>
        </div>

        <AntdTooltip
          placement="bottom"
          overlayStyle={{
            maxWidth: '440px',
            ...(fbDPALink ? { display: 'none' } : {}),
          }}
          title={
            <>
              <div>{t('facebook-pixel.dpa-link-tip-1')}</div>
              <div>{t('facebook-pixel.dpa-link-tip-2')}</div>
            </>
          }
        >
          <Button disabled={!facebookPixelId || !fbDPALink} id="fbDPALink">
            {facebookPixelId
              ? t('facebook-pixel.copy-dpa-link')
              : t('facebook-pixel.set-pixel-first')}
          </Button>
        </AntdTooltip>
      </div>
    );
  }),
);
