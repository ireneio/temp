// import
import { useEffect } from 'react';
import { message } from 'antd';
import Clipboard from 'clipboard';
import { emptyFunction } from 'fbjs';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// definition
export default (loading: boolean, orderId: string | null | undefined): void => {
  const { t } = useTranslation('thank-you-page');

  useEffect((): (() => void) => {
    if (loading || orderId) return emptyFunction;

    const clipboard = new Clipboard('button[role="copy"]', {
      text: () => `${t('data-error')}${window.location.href}`,
    }).on('success', () => {
      message.success(t('copied'));
    });

    return () => {
      clipboard.destroy();
    };
  }, [t, loading, orderId]);
};
