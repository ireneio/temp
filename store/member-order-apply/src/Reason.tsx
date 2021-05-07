// import
import React from 'react';
import { Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/reason.less';

// typescript definition
interface PropsType {
  forwardedRef: React.Ref<Input>;
  value?: string;
  checking: boolean;
  onChange?: (value: string) => void;
}

// definition
const Reason = React.memo(({ checking, value, onChange }: PropsType) => {
  const { t } = useTranslation('member-order-apply');

  if (checking) return <div className={styles.root}>{value}</div>;
  return (
    <Input
      className={styles.root}
      placeholder={t('reason')}
      value={value || ''}
      onChange={({ target: { value: reason } }) => onChange?.(reason)}
    />
  );
});

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <Reason {...props} forwardedRef={ref} />
  ),
);
