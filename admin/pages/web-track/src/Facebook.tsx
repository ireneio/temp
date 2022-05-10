// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import React, { useState, useEffect } from 'react';
import { Form, Button, Input, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useCopyToClipboard } from 'react-use';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';
import { webTrackFacebook_w130 as webTrackFacebook } from '@meepshop/images';
import Link from '@meepshop/link';

import useSetFacebookAdTracks from './hooks/useSetFacebookAdTracks';
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
  const [{ value: copyValue }, copyToClipboard] = useCopyToClipboard();
  const [copyTimes, setCopyTimes] = useState<number>(0);
  const [editMode, setEditMode] = useState(false);
  const setFacebookAdTracks = useSetFacebookAdTracks(
    id || 'null-id' /* SHOULD_NOT_BE_NULL */,
    setEditMode,
  );

  useEffect(() => {
    if (copyValue)
      message.success({
        content: t('facebook.dpa.copied'),
        duration: 2,
        icon: <CheckCircleOutlined />,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyValue, copyTimes]);

  return (
    <Form onFinish={setFacebookAdTracks}>
      <img className={styles.img} src={webTrackFacebook} alt="facebook" />

      <div className={styles.description}>{t('facebook.description')}</div>

      {[
        {
          key: 'pixelId',
          url:
            'https://supportmeepshop.com/knowledgebase/facebook%e5%83%8f%e7%b4%a0/',
          initialValue: facebookPixelId,
          rules: [
            (form: FormInstance) => {
              const { getFieldValue } = form;

              if (!getFieldValue(['conversionsAccessToken'])) return {};

              return {
                required: true,
                message: t('facebook.pixelId.required'),
              };
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
              onlyLink
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
                <Input placeholder={t(`facebook.${key}.placeholder`)} />
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

        <Tooltip
          arrowPointAtCenter
          placement="top"
          onlyLink
          title={
            <Link
              href="https://supportmeepshop.com/knowledgebase/facebook-facebook-動態廣告-dpa/"
              target="_blank"
            >
              <a href="https://supportmeepshop.com/knowledgebase/facebook-facebook-動態廣告-dpa/">
                {t(`facebook.dpa.hint`)}
              </a>
            </Link>
          }
        />
        <div>
          <div>{t('facebook.dpa.description.0')}</div>
          <div>{t('facebook.dpa.description.1')}</div>
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
            <div>{t('facebook.dpa.tip.0')}</div>
            <div>{t('facebook.dpa.tip.1')}</div>
          </>
        }
      >
        <Button
          disabled={!facebookPixelId || !fbDPALink}
          onClick={() => {
            copyToClipboard(fbDPALink || '');
            setCopyTimes(copyTimes + 1);
          }}
        >
          {facebookPixelId
            ? t('facebook.dpa.copy-link')
            : t('facebook.dpa.set-pixel-id-first')}
        </Button>
      </Tooltip>
    </Form>
  );
});
