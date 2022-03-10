// typescript import
import { InputProps } from 'antd';

// import
import React, { useEffect } from 'react';
import { Input, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useCopyToClipboard } from 'react-use';

import { useTranslation } from '@meepshop/locales';
import message from '@admin/message';
import Tooltip from '@admin/tooltip';

import styles from './styles/promoCodeInput.less';

// typescript definition
interface PropsType extends InputProps {
  value?: string;
}

// definition
export default React.memo(({ value, ...props }: PropsType) => {
  const { t } = useTranslation('affiliate-program');
  const [copied, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    if (copied.value)
      message.success(t('promoCode.copied', { promoCode: copied.value }));
  }, [t, copied]);

  return (
    <div className={styles.root}>
      <Input
        {...props}
        value={value}
        placeholder={t('promoCode.placeholder')}
        addonBefore="?ref="
      />

      <Tooltip title={t('promoCode.tooltip')}>
        <Button
          icon={<CopyOutlined />}
          onClick={() => {
            if (value) copyToClipboard(value);
          }}
          type="primary"
          ghost
        />
      </Tooltip>
    </div>
  );
});
