// typescript import
import { QueryResult } from '@apollo/react-common';

import { PlanType } from './usePlans';

// import
import { useState, useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Modal, message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { StoreBillPlanItemFeeTypeEnum } from '../../../../__generated__/admin';
import {
  launchStore as launchStoreType,
  launchStoreVariables,
} from '../gqls/__generated__/launchStore';
import {
  quotation_quotation_monthly as quotationQuotationMonthly,
  quotation_quotation_yearly as quotationQuotationYearly,
} from '../gqls/__generated__/quotation';

// graphql import
import { launchStore } from '../gqls/usePayment';

// typescript definition
export interface SelectedPlanType extends PlanType {
  feeType: StoreBillPlanItemFeeTypeEnum;
}

// definition
export default (
  plan: SelectedPlanType,
  feeType: StoreBillPlanItemFeeTypeEnum,
  quotation: quotationQuotationMonthly | quotationQuotationYearly | null,
  isNoNeedToPay: boolean,
  refetch: QueryResult['refetch'],
): {
  hasErrors: boolean;
  setPrime: (prime: string | null) => void;
  loading: boolean;
  launchStore: () => void;
  success: { [key: string]: string } | null;
} => {
  const { t } = useTranslation('plan-setting');
  const [prime, setPrime] = useState<string | null>('');
  const [success, setSuccess] = useState<{ [key: string]: string } | null>(
    null,
  );

  const [mutation, { loading }] = useMutation<
    launchStoreType,
    launchStoreVariables
  >(launchStore, {
    onCompleted: data => {
      switch (data.launchStore.result) {
        case 'SUCCESS': {
          setSuccess({
            title: isNoNeedToPay
              ? t('payment.success.verify-title')
              : t('payment.success.title'),
            description: t('payment.success.description'),
          });
          break;
        }
        case 'FAIL_NOT_ACCEPTABLE':
          Modal.warning({
            title: t('payment.warning.title'),
            content: t('payment.warning.description'),
            okText: t('payment.ok'),
          });

          refetch();
          break;
        case 'FAIL_NOT_PROCESSABLE':
        case 'FAIL_PAYMENT':
        case 'FAIL_SYSTEM_ERROR':
          Modal.error({
            title: isNoNeedToPay
              ? t('payment.verify-fail.title')
              : t('payment.fail.title'),
            content: isNoNeedToPay
              ? t('payment.verify-fail.description')
              : t('payment.fail.description'),
            okText: t('payment.ok'),
          });
          break;
        default:
          message.error(data.launchStore.result);
          break;
      }
    },
  });

  return {
    hasErrors: useMemo(() => prime === null, [prime]),
    setPrime,
    loading,
    launchStore: useCallback(() => {
      if (prime && prime !== '' && quotation)
        mutation({
          variables: {
            input: {
              planId: plan.id,
              feeType,
              twdFee: quotation.total.twd,
              tappayPrime: prime,
            },
          },
        });
      else setPrime(null);
    }, [plan, feeType, quotation, prime, mutation]),
    success,
  };
};
