// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import { useEffect } from 'react';
import { message } from 'antd';
import Clipboard from 'clipboard';

// definition
export default (
  t: I18nPropsType['t'],
  loading: boolean,
  orderId: string | null | undefined,
): void => {
  useEffect(() => {
    if (!loading && !orderId)
      new Clipboard('button[role="copy"]', {
        text: () => `${t('data-error')}${window.location.href}`,
      }).on('success', () => {
        message.success(t('copied'));
      });
  }, [t, loading, orderId]);
};
