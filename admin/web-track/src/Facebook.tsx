// import
import React, { useState } from 'react';
import { Form, Tooltip as AntdTooltip, Button, Input } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { webTrackFacebook_w130 as webTrackFacebook } from '@meepshop/images';
import Link from '@meepshop/link';

import useSetFacebookAdTracks from './hooks/useSetFacebookAdTracks';
import useClipboard from './hooks/useClipboard';
import styles from './styles/facebook.less';

// graphql typescript
import { facebookStoreFragment as facebookStoreFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  store: facebookStoreFragmentType;
}

// definition
const { Item: FormItem } = Form;
const { TextArea } = Input;

export default React.memo(({ store }: PropsType) => {
  const {
    id,
    adTracks: { facebookPixelId, facebookConversionsAccessToken },
  } = store;
  const fbDPALink = store.setting?.fbDPALink || null;
  const { t } = useTranslation('web-track');
  const [editMode, setEditMode] = useState(false);
  const setFacebookAdTracks = useSetFacebookAdTracks(
    id || 'null-id' /* SHOULD_NOT_BE_NULL */,
    setEditMode,
  );

  useClipboard(fbDPALink || '', '#fbDPALink', t('facebook.dpa.copied'));

  return (
    <Form onFinish={setFacebookAdTracks}>
      <img className={styles.img} src={webTrackFacebook} alt="facebook" />

      {[
        {
          key: 'pixelId',
          url:
            'https://supportmeepshop.com/knowledgebase/facebook%e5%83%8f%e7%b4%a0/',
          initialValue: facebookPixelId,
          rules: [
            {
              required: true,
              message: t('required'),
            },
            {
              pattern: /^(\d{15}|\d{16})$/,
              message: t('facebook.pixelId.error'),
            },
          ],
        },
        {
          key: 'conversionsAccessToken',
          url:
            'https://supportmeepshop.com/knowledgebase/%e4%b8%b2%e6%8e%a5facebook-%e8%bd%89%e6%8f%9b-api-conversions-api',
          initialValue: facebookConversionsAccessToken,
          rules: [
            {
              pattern: /^[^ ]+$/,
              message: t('facebook.conversionsAccessToken.error'),
            },
          ],
        },
      ].map(({ key, url, initialValue, rules }) => (
        <div key={key} className={styles.block}>
          <div className={styles.title}>
            <div>{t(`facebook.${key}.title`)}</div>

            <Tooltip
              arrowPointAtCenter
              placement="top"
              title={
                <Link href={url} target="_blank">
                  <a href={url}>{t(`facebook.${key}.tip`)}</a>
                </Link>
              }
            />
          </div>

          {editMode ? (
            <FormItem
              className={styles.item}
              name={[key]}
              initialValue={initialValue}
              rules={rules}
              validateTrigger="onBlur"
            >
              {key === 'pixelId' ? (
                <Input />
              ) : (
                <TextArea
                  placeholder={t(`facebook.${key}.placeholder`)}
                  autoSize={{ minRows: 3 }}
                />
              )}
            </FormItem>
          ) : (
            <div className={styles.preview}>
              {initialValue || t('facebook.empty')}
            </div>
          )}
        </div>
      ))}

      {!editMode ? (
        <Button onClick={() => setEditMode(true)}>
          {t('facebook.setting')}
        </Button>
      ) : (
        <>
          <Button className={styles.save} type="primary" htmlType="submit">
            {t('save')}
          </Button>

          <Button onClick={() => setEditMode(false)}>{t('cancel')}</Button>
        </>
      )}

      <div className={styles.dpa}>
        {t('facebook.dpa.title')}
        <div>
          <div>{t('facebook.dpa.description.0')}</div>
          <div>{t('facebook.dpa.description.1')}</div>
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
            <div>{t('facebook.dpa.tip.0')}</div>
            <div>{t('facebook.dpa.tip.1')}</div>
          </>
        }
      >
        <Button disabled={!facebookPixelId || !fbDPALink} id="fbDPALink">
          {facebookPixelId
            ? t('facebook.dpa.copy-link')
            : t('facebook.dpa.set-pixel-id-first')}
        </Button>
      </AntdTooltip>
    </Form>
  );
});
