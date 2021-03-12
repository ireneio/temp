// import
import React from 'react';
import { useRifm } from 'rifm';
import { Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

// typescript definition
interface PropsType {
  forwardedRef?: React.Ref<Input>;
  value?: string;
  onChange?: (value: string | number) => void;
}

// definition
const CreditCardInput = React.memo(
  ({ value, onChange, forwardedRef, ...props }: PropsType) => {
    const { t } = useTranslation('gmo-credit-card-form');
    const rifm = useRifm({
      value: value || '',
      mask: true,
      onChange: (cardNumber: string): void => {
        if (onChange) onChange(cardNumber);
      },
      format: (cardNumberFormat: string): string =>
        cardNumberFormat
          .replace(/ - /g, '')
          .match(/\d{1,4}/g)
          ?.join(' - ') || '',
    });

    return (
      <Input
        {...props}
        ref={forwardedRef}
        value={rifm.value}
        placeholder={t('cardNumber')}
        onChange={rifm.onChange}
        maxLength={25}
      />
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <CreditCardInput {...props} forwardedRef={ref} />
  ),
);
