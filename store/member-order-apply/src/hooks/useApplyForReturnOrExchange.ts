// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  applyForReturnOrExchange as applyForReturnOrExchangeType,
  applyForReturnOrExchangeVariables,
  ApplicationTypeEnum,
} from '@meepshop/types/gqls/store';

// graphql import
import { applyForReturnOrExchange } from '../gqls/useApplyForReturnOrExchange';

// typescript definition
export type applyType = 'refund' | 'exchange';

// definition
export default (
  type: applyType,
  orderId: string,
  { validateFields }: FormComponentProps['form'],
): (() => void) => {
  const Router = useRouter();
  const { t } = useTranslation('member-order-apply');

  const [mutation] = useMutation<
    applyForReturnOrExchangeType,
    applyForReturnOrExchangeVariables
  >(applyForReturnOrExchange, {
    onCompleted: data => {
      const status = data?.applyForReturnOrExchange.__typename;

      switch (status) {
        case 'OrderProductsAppliedForReturnOrExchange': {
          Router.push('/orders');
          message.success(t('success'));
          break;
        }

        case 'OrderNotFoundError':
        case 'UnauthorizedError':
        case 'AppliedQuantityExceedsLimitError':
        case 'CannotReturnGiftError':
          message.error(status);
          break;

        default:
          message.error(t('error'));
          break;
      }
    },
  });

  return useCallback(() => {
    validateFields(
      (_, { selectedProducts, replaceRecipient, reason, quantitySelected }) => {
        mutation({
          variables: {
            orderId,
            input: {
              orderId,
              applicationType:
                type === 'refund'
                  ? ('RETURN' as ApplicationTypeEnum)
                  : ('REPLACE' as ApplicationTypeEnum),
              orderProducts: selectedProducts.map((id: string) => ({
                id,
                quantity: quantitySelected[id],
                applicationInfo: {
                  comment: reason[id] || '',
                },
              })),
              ...(type !== 'exchange'
                ? null
                : {
                    recipient: replaceRecipient,
                  }),
            },
          },
        });
      },
    );
  }, [mutation, orderId, type, validateFields]);
};
