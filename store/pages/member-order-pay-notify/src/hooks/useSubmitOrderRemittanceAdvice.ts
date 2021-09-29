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

// typescript definition
interface ValuesType {
  remittanceAdvice: string;
}

// definition
export default (
  order: useSubmitOrderRemittanceAdviceFragmentType | null,
  setDisabledEdit: (disabledEdit: boolean) => void,
): ((values: ValuesType) => void) => {
  const { t } = useTranslation('member-order-pay-notify');
  const [mutation] = useMutation<
    submitOrderRemittanceAdviceType,
    submitOrderRemittanceAdviceVariables
  >(submitOrderRemittanceAdvice);

  return useCallback(
    input => {
      const id = order?.id;

      if (!id) return;

      mutation({
        variables: {
          input: {
            ...input,
            orderId: id,
          },
        },
        update: (cache, { data }) => {
          if (data?.submitOrderRemittanceAdvice.__typename !== 'OkResponse')
            return;

          cache.writeFragment<useSubmitOrderRemittanceAdviceFragmentType>({
            id,
            fragment: useSubmitOrderRemittanceAdviceFragment,
            data: {
              __typename: 'Order',
              id,
              paymentInfo: {
                __typename: 'paymentInfoType',
                id: order?.paymentInfo?.id || null, // SHOULD_NOT_BE_NULL
                status: 1,
              },
              paidMessage: [
                ...(order?.paidMessage || []),
                {
                  __typename: 'PaidMessageObject',
                  note: input.remittanceAdvice,
                },
              ],
            },
          });
          notification.success({ message: t('send-success') });
          setDisabledEdit(true);
        },
      });
    },
    [order, setDisabledEdit, t, mutation],
  );
};
