// typescript import
import { MutationHookOptions } from '@apollo/react-hooks';
import { MutationFunction } from '@apollo/react-common';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  submitOrderRemittanceAdvice as submitOrderRemittanceAdviceType,
  submitOrderRemittanceAdviceVariables,
  useSubmitOrderRemittanceAdviceFragment as useSubmitOrderRemittanceAdviceFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  submitOrderRemittanceAdvice,
  useSubmitOrderRemittanceAdviceFragment,
} from '../gqls/useSubmitOrderRemittanceAdvice';

// definition
export default (
  order: useSubmitOrderRemittanceAdviceFragmentType | null,
  setDisabledEdit: (disabledEdit: boolean) => void,
): MutationFunction<
  submitOrderRemittanceAdviceType,
  submitOrderRemittanceAdviceVariables
> => {
  const { t } = useTranslation('member-order-pay-notify');
  const [mutation] = useMutation<
    submitOrderRemittanceAdviceType,
    submitOrderRemittanceAdviceVariables
  >(submitOrderRemittanceAdvice);

  return useCallback(
    ({
      variables,
      ...options
    }: MutationHookOptions<
      submitOrderRemittanceAdviceType,
      submitOrderRemittanceAdviceVariables
    >) =>
      mutation({
        ...options,
        variables,
        update: (cache, { data }) => {
          if (
            data?.submitOrderRemittanceAdvice.__typename !== 'OkResponse' ||
            !variables
          )
            return;

          cache.writeFragment<useSubmitOrderRemittanceAdviceFragmentType>({
            id: variables.input.orderId,
            fragment: useSubmitOrderRemittanceAdviceFragment,
            data: {
              __typename: 'Order',
              id: variables.input.orderId,
              paymentInfo: {
                __typename: 'paymentInfoType',
                id: order?.paymentInfo?.id || null, // SHOULD_NOT_BE_NULL
                status: 1,
              },
              paidMessage: [
                ...(order?.paidMessage || []),
                {
                  __typename: 'PaidMessageObject',
                  note: variables.input.remittanceAdvice,
                },
              ],
            },
          });
          notification.success({ message: t('send-success') });
          setDisabledEdit(true);
        },
      }),
    [order, setDisabledEdit, t, mutation],
  );
};
