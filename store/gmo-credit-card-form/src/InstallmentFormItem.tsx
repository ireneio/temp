// typescript import
import { QueryResult } from 'react-apollo';
import { CascaderOptionType } from 'antd/lib/cascader';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Cascader, Select } from 'antd';
import memoizeOne from 'memoize-one';

import { withNamespaces } from '@store/utils/lib/i18n';

import styles from './styles/installmentFormItem.less';

// graphql typescript
import {
  getGmoAvailableInstallments,
  getGmoAvailableInstallmentsVariables,
} from './__generated__/getGmoAvailableInstallments';

// graphql import
import localeFragment from '@store/utils/lib/fragments/locale';

// typescript definition
interface PropsType
  extends I18nPropsType,
    getGmoAvailableInstallments,
    Pick<
      QueryResult<
        getGmoAvailableInstallments,
        getGmoAvailableInstallmentsVariables
      >,
      'refetch'
    > {
  cardNumber: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled: boolean;
}

// definition
const { Option } = Select;

class InstallmentFormItem extends React.PureComponent<PropsType> {
  private getOptions = memoizeOne(
    (
      allGmoBankInstallments: PropsType['allGmoBankInstallments'],
      t: PropsType['t'],
      i18n: PropsType['i18n'],
    ): CascaderOptionType[] =>
      allGmoBankInstallments.map(({ name, code, installments }, index) => ({
        value: index.toString(),
        label: name[i18n.language],
        children: installments.map(installment => ({
          value: `${code || ''}${installment}`,
          label: `${installment} ${t('installment')}`,
        })),
      })),
  );

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      i18n,

      // props
      disabled,
      value,
      onChange,
      gmoBankInstallment,
      allGmoBankInstallments,
    } = this.props;

    if (!gmoBankInstallment && !allGmoBankInstallments)
      return (
        <Select
          className={styles.root}
          placeholder={t('installments')}
          disabled
        />
      );

    if (!gmoBankInstallment)
      return (
        <Cascader
          className={styles.root}
          placeholder={`${t('bank')} / ${t('installments')}`}
          options={this.getOptions(allGmoBankInstallments, t, i18n)}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      );

    const { installments, code } = gmoBankInstallment;

    return (
      <>
        <Select
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
              .map(({ name }) => name[i18n.language])
              .join(t('dot'))}
          </div>
        )}
      </>
    );
  }
}

const EnhancedInstallmentFormItem = withNamespaces('gmo-credit-card-form')(
  InstallmentFormItem,
);

export default React.forwardRef(
  (
    {
      cardNumber,
      storePaymentId,
      value,
      onChange,
    }: Pick<PropsType, 'cardNumber' | 'value' | 'onChange'> & {
      storePaymentId: string;
    },
    ref: React.Ref<
      Query<getGmoAvailableInstallments, getGmoAvailableInstallmentsVariables>
    >,
  ) => (
    <Query<getGmoAvailableInstallments, getGmoAvailableInstallmentsVariables>
      ref={ref}
      query={gql`
        query getGmoAvailableInstallments(
          $storePaymentId: String!
          $bin: String!
        ) {
          gmoBankInstallment(storePaymentId: $storePaymentId, bin: $bin) {
            name {
              ...localeFragment
            }
            code
            installments
          }

          allGmoBankInstallments(storePaymentId: $storePaymentId) {
            name {
              ...localeFragment
            }
            code
            installments
          }
        }

        ${localeFragment}
      `}
      variables={{
        storePaymentId,
        bin: cardNumber,
      }}
      skip={cardNumber.length !== 16}
    >
      {({ loading, error, data, refetch }) => (
        <EnhancedInstallmentFormItem
          {...(data as getGmoAvailableInstallments)}
          cardNumber={cardNumber}
          value={value}
          onChange={onChange}
          disabled={
            cardNumber.length !== 16 || Boolean(loading || error || !data)
          }
          refetch={refetch}
        />
      )}
    </Query>
  ),
);
