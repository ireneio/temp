// import
import React, { useCallback } from 'react';
import { Modal, Button } from 'antd';
import { InfoCircleOutlined, CheckOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsGeniusCongratulations_w120_h120 as adminSettingAppsGeniusCongratulations } from '@meepshop/images';
import { useRouter } from '@meepshop/link';

import useSuccess from './useSuccess';
import styles from '../styles/useStartSubscription.less';

// typescript definition
interface OptionsType {
  key: string;
  img: string;
  price: React.ReactNode;
  featureAmount: number;
  submit: () => Promise<boolean>;
  successTitle: string;
  successLink?: string;
}

// definition
export default ({
  successTitle,
  successLink,
  ...options
}: OptionsType): (() => void) => {
  const { t } = useTranslation('setting-apps');
  const router = useRouter();
  const success = useSuccess({
    img: adminSettingAppsGeniusCongratulations,
    title: successTitle,
    content: modalRef => (
      <>
        {t('start.success.content')}

        {!successLink ? null : (
          <Button
            onClick={() => {
              router.push(successLink);

              if (modalRef.current) modalRef.current.destroy();
            }}
            type="primary"
          >
            {t('start.success.start')}
          </Button>
        )}
      </>
    ),
    className: styles.success,
    okButtonProps: {
      type: 'text',
    },
    okText: t('start.success.go-back'),
  });

  return useCallback(() => {
    const { key, img, price, featureAmount, submit } = options;

    Modal.confirm({
      width: '100%',
      className: styles.root,
      title: t('start.title'),
      icon: null,
      content: (
        <>
          <div className={styles.content}>
            <img src={img} alt={key} />

            <div>
              <div className={styles.title}>{t(`${key}.start.title`)}</div>

              {t(`${key}.start.content`)}
            </div>

            <div>{price}</div>
          </div>

          <div className={styles.featureTitle}>
            {t(`${key}.start.feature.title`)}
          </div>

          {[].constructor
            .apply({}, new Array(featureAmount))
            .map((_: unknown, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${key}_${index}`} className={styles.feature}>
                <CheckOutlined />

                {t(`${key}.start.feature.${index}`)}
              </div>
            ))}

          <div className={styles.warn}>
            <InfoCircleOutlined />

            {t('start.warn')}
          </div>
        </>
      ),
      okText: t('start.ok'),
      onOk: async () => {
        if (await submit()) success();
      },
      cancelText: t('start.cancel'),
    });
  }, [options, t, success]);
};
