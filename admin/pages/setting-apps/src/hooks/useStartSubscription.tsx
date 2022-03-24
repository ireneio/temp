// import
import React, { useCallback } from 'react';
import { Modal, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsGeniusCongratulations_w120_h120 as adminSettingAppsGeniusCongratulations } from '@meepshop/images';
import { useRouter } from '@meepshop/link';

import useSuccess from './useSuccess';
import styles from '../styles/useStartSubscription.less';

// typescript definition
interface OptionsType {
  content: React.ReactNode;
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
    const { content, submit } = options;

    Modal.confirm({
      width: '100%',
      className: styles.root,
      title: t('start.title'),
      icon: null,
      content: (
        <>
          {content}

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
