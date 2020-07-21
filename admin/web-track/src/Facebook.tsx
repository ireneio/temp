// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {
  Tooltip as AntdTooltip,
  Icon,
  Button,
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import Clipboard from 'clipboard';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/utils/lib/i18n';
import {
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
      const clipboard = new Clipboard('#fbDPALink', {
        text: () => fbDPALink || '',
      }).on('success', () => {
        message.success({
          content: t('facebook-pixel.copied'),
          duration: 2,
          icon: <Icon type="check-circle" />,
        });
      });

      return () => {
        clipboard.destroy();
      };
    }, [t, fbDPALink]);

    const { getFieldDecorator, validateFields } = form;

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
          </Item>
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
          <Button disabled={!pixelId || !fbDPALink} id="fbDPALink">
            {pixelId
              ? t('facebook-pixel.copy-dpa-link')
              : t('facebook-pixel.set-pixel-first')}
          </Button>
        </AntdTooltip>
      </div>
    );
  }),
);
