// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Tooltip, Icon, Button, Modal, Form, Input, message } from 'antd';
import Clipboard from 'clipboard';

import { useTranslation } from '@admin/utils/lib/i18n';
import getImage, {
  webTrackFacebook_w130 as webTrackFacebook,
  webTrackFacebookPixelInstruction_w890 as webTrackFacebookPixelInstruction,
} from '@meepshop/images';

import styles from './styles/facebook.less';

// graphql typescript
import { setFbPixel as setFbPixelType } from './__generated__/setFbPixel';
import { getFbPixel as getFbPixelType } from './__generated__/getFbPixel';

// typescript definition
interface PropsType extends FormComponentProps {
  pixelId: string | null;
  fbDPALink: string | null;
}

// definition
const { Item } = Form;

export const facebookFbPixelFragment = gql`
  fragment facebookFbPixelFragment on FbPixel {
    pixelId
  }
`;

export const facebookStoreFragment = gql`
  fragment facebookStoreFragment on Store {
    id
    setting {
      fbDPALink
    }
  }
`;

export default Form.create<PropsType>()(
  React.memo(({ pixelId, fbDPALink, form }: PropsType) => {
    const { t } = useTranslation('web-track');
    const [isOpen, openModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [setFbPixel] = useMutation<setFbPixelType>(
      gql`
        mutation setFbPixel($input: FbPixelInput!) {
          setFbPixel(input: $input) {
            ...facebookFbPixelFragment
          }
        }
        ${facebookFbPixelFragment}
      `,
      {
        update: (cache, { data }) => {
          message.success(t('save-success'));
          cache.writeQuery<getFbPixelType>({
            query: gql`
              query getFbPixel {
                getFbPixel {
                  ...facebookFbPixelFragment
                }
              }
              ${facebookFbPixelFragment}
            `,
            data: {
              getFbPixel: {
                __typename: 'FbPixel',
                pixelId: data?.setFbPixel?.pixelId || null,
              },
            },
          });
        },
      },
    );
    useEffect(() => {
      const clipboard = new Clipboard('button[role="copy"]', {
        text: () => fbDPALink || '',
      }).on('success', () => {
        message.success(t('facebook-pixel.copied'));
      });

      return () => {
        clipboard.destroy();
      };
    }, [t, fbDPALink]);

    const { getFieldDecorator, validateFields } = form;

    return (
      <div>
        <img src={getImage(webTrackFacebook)} alt="facebook" />

        <div className={styles.title}>
          <div>{t('facebook-pixel.title')}</div>
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
            src={getImage(webTrackFacebookPixelInstruction)}
            alt="FacebookPixelInstruction"
          />
        </Modal>

        {editMode ? (
          <div className={styles.item}>
            <Item>
              {getFieldDecorator('pixelId', {
                initialValue: pixelId,
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
            </Item>
            <Button
              type="primary"
              onClick={() => {
                validateFields((errors, values) => {
                  if (!errors) {
                    setFbPixel({
                      variables: {
                        input: {
                          pixelId: values.pixelId,
                        },
                      },
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
            {pixelId ? (
              <div className={styles.pixelNo}>
                <div>{t('facebook-pixel.pixel-no')}</div>
                <div>{pixelId}</div>
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

        <Tooltip
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
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <Button disabled={!pixelId || !fbDPALink} role="copy">
            {pixelId
              ? t('facebook-pixel.copy-dpa-link')
              : t('facebook-pixel.set-pixel-first')}
          </Button>
        </Tooltip>
      </div>
    );
  }),
);
