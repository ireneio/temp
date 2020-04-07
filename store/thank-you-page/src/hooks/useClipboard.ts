// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import { useEffect } from 'react';
import { message } from 'antd';
import Clipboard from 'clipboard';
import { emptyFunction } from 'fbjs';

// definition
export default (
  t: I18nPropsType['t'],
  loading: boolean,
  orderId: string | null | undefined,
): void => {
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
