// typescript import
import { RefSelectProps } from 'antd/lib/select';

import { languageType } from '@meepshop/locales';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { Cascader, Select } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useOptions from './hooks/useOptions';
import styles from './styles/installmentFormItem.less';

// graphql typescript
import {
  getGmoAvailableInstallments as getGmoAvailableInstallmentsType,
  getGmoAvailableInstallmentsVariables as getGmoAvailableInstallmentsVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { getGmoAvailableInstallments } from './gqls/installmentFormItem';

// typescript definition
interface PropsType {
  forwardedRef: React.Ref<Cascader | RefSelectProps>;
  cardNumber: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  storePaymentId: string;
}

// definition
const { Option } = Select;
const InstallmentForm = React.memo(
  ({
    cardNumber,
    storePaymentId,
    value,
    onChange,
    forwardedRef,
  }: PropsType) => {
    const { t, i18n } = useTranslation('gmo-credit-card-form');
    const cardNumberFormat = cardNumber.replace(/ - /g, '');
    const { data, error, loading } = useQuery<
      getGmoAvailableInstallmentsType,
      getGmoAvailableInstallmentsVariablesType
    >(getGmoAvailableInstallments, {
      variables: {
        storePaymentId,
        bin: cardNumberFormat,
      },
      fetchPolicy: 'network-only',
      skip: cardNumberFormat.length !== 16,
    });

    const allGmoBankInstallments = data?.allGmoBankInstallments || null;
    const gmoBankInstallment = data?.gmoBankInstallment || null;
    const disabled =
      cardNumberFormat.length !== 16 || Boolean(loading || error || !data);
    const options = useOptions(allGmoBankInstallments);

    if (!gmoBankInstallment && !allGmoBankInstallments)
      return (
        <Select
          ref={forwardedRef as React.Ref<RefSelectProps>}
          className={styles.root}
          placeholder={t('installments')}
          disabled
        />
      );

    if (!gmoBankInstallment)
      return (
        <Cascader
          ref={forwardedRef as React.Ref<Cascader>}
          className={styles.root}
          placeholder={`${t('bank')} / ${t('installments')}`}
          options={options}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );

    const { installments, code } = gmoBankInstallment;

    return (
      <>
        <Select
          ref={forwardedRef as React.Ref<RefSelectProps>}
          className={styles.root}
          placeholder={t('installments')}
          value={value}
          onChange={onChange}
          disabled={disabled || installments.length === 0}
        >
          {installments.map(installment => (
            <Option key={installment} value={`${code || ''}${installment}`}>
              {installment} {t('installment')}
            </Option>
          ))}
        </Select>

        {installments.length !== 0 ? null : (
          <div className={styles.notGmoBank}>
            <h4>{t('not-gmo-bank')}</h4>

            {allGmoBankInstallments
              ?.map(
                ({ name }) => name[i18n.language as languageType] || name.zh_TW,
              )
              .join(t('dot'))}
          </div>
        )}
      </>
    );
  },
);

export default React.forwardRef(
  (props: Omit<PropsType, 'forwardedRef'>, ref: PropsType['forwardedRef']) => (
    <InstallmentForm {...props} forwardedRef={ref} />
  ),
);
