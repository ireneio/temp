// typescript import
import { QueryResult } from '@apollo/react-common';

import { SelectedPlanType } from './usePayment';

// import
import { useMemo, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import {
  StoreBillPlanItemFeeTypeEnum,
  quotation as quotationType,
  quotationVariables,
  quotation_quotation_monthly as quotationQuotationMonthly,
  quotation_quotation_yearly as quotationQuotationYearly,
} from '@meepshop/types/gqls/admin';

// graphql import
import { quotation as query } from '../gqls/useQuotation';

// definition
export default (
  plan: SelectedPlanType,
  feeType: StoreBillPlanItemFeeTypeEnum,
): {
  quotation: quotationQuotationMonthly | quotationQuotationYearly | null;
  fxRate: string;
  isTWD: boolean;
  isDiscounted: boolean;
  isNoNeedToPay: boolean;
  refetch: QueryResult['refetch'];
} => {
  const { currency } = useContext(CurrencyContext);

  const { data, refetch } = useQuery<quotationType, quotationVariables>(query, {
    variables: {
      planId: plan.id,
    },
  });

  const quotation =
    useMemo(
      () => data?.quotation?.[feeType.toLowerCase() as 'monthly' | 'yearly'],
      [data, feeType],
    ) || null;

  return {
    quotation,
    fxRate: useMemo(() => data?.quotation?.fxRate.local.toFixed(2) || '', [
      data,
    ]),
    isTWD: useMemo(() => currency === 'TWD', [currency]),
    isDiscounted: useMemo(() => !!quotation?.discount, [quotation]),
    isNoNeedToPay: useMemo(
      () =>
        (quotation?.total.amount || 0) * (data?.quotation?.fxRate.twd || 0) <=
        11,
      [quotation, data],
    ),
    refetch,
  };
};
