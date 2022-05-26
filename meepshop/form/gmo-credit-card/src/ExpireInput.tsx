// import
import React from 'react';
import { useRifm } from 'rifm';
import { Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

// typescript definition
interface PropsType {
  forwardedRef?: React.Ref<Input>;
  value?: string;
  onChange?: (value: string) => void;
}

// definition
const ExpireInput = React.memo(
  ({ value, onChange, forwardedRef, ...props }: PropsType) => {
    const { t } = useTranslation('gmo-credit-card-form');

    const rifm = useRifm({
      value: value || '',
      mask: true,
      onChange: (expire: string): void => {
        if (onChange) onChange(expire);
      },
      format: (expireFormat: string): string =>
        expireFormat
          .replace(/ \/ /g, '')
          .match(/\d{1,2}/g)
          ?.join(' / ') || '',
    });

    return (
      <Input
        {...props}
        ref={forwardedRef}
        value={rifm.value}
        placeholder={t('expire')}
        onChange={rifm.onChange}
        maxLength={7}
      />
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <ExpireInput {...props} forwardedRef={ref} />
  ),
);
