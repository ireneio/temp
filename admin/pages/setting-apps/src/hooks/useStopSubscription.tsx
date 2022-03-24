// import
import React, { useMemo, useCallback } from 'react';
import { Modal } from 'antd';
import { endOfMonth, addDays, format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsGeniusBye_w120_h120 as adminSettingAppsGeniusBye } from '@meepshop/images';
import { WarningFlatIcon } from '@meepshop/icons';

import useSuccess from './useSuccess';
import styles from '../styles/useStopSubscription.less';

// typescript definition
interface OptionsType {
  title: string;
  content: (expirationDate: string) => React.ReactNode;
  submit: () => Promise<boolean>;
}

// definition
export default (options: OptionsType): (() => void) => {
  const { t } = useTranslation('setting-apps');
  const expirationDate = useMemo(
    () => format(addDays(endOfMonth(new Date()), 1), 'yyyy/M/d'),
    [],
  );
  const success = useSuccess({
    img: adminSettingAppsGeniusBye,
    title: t('stop.success.title'),
    content: () => (
      <>
        {t('stop.success.content.0')}

        <span> {expirationDate} </span>

        {t('stop.success.content.1')}
      </>
    ),
    className: styles.success,
    okButtonProps: {
      type: 'text',
    },
    okText: t('stop.success.go-back'),
  });

  return useCallback(() => {
    const { title, content, submit } = options;

    Modal.confirm({
      width: '100%',
      className: styles.root,
      title: (
        <>
          <WarningFlatIcon />

          <div>{title}</div>
        </>
      ),
      icon: null,
      content: content(expirationDate),
      okButtonProps: {
        type: 'default',
      },
      okText: t('stop.ok'),
      cancelButtonProps: {
        type: 'text',
      },
      cancelText: t('stop.cancel'),
      onCancel: async () => {
        if (await submit()) success();
      },
    });
  }, [options, t, expirationDate, success]);
};
