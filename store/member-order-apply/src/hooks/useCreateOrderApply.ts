// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useRouter } from '@meepshop/link';

// graphql typescript
import { createOrderApply as createOrderApplyType } from '@meepshop/types/gqls/store';

// graphql import
import { createOrderApply } from '../gqls/useCreateOrderApply';

// typescript definition
export type applyType = 'refund' | 'exchange';

// definition
export default (
  type: applyType,
  orderId: string,
  { validateFields }: FormComponentProps['form'],
): (() => void) => {
  const Router = useRouter();
  const [mutation] = useMutation<createOrderApplyType>(createOrderApply, {
    onCompleted: () => Router.push('/orders'),
  });

  return useCallback(() => {
    validateFields(
      (_, { selectedProducts, replaceRecipient, reason, quantitySelected }) => {
        // TODO: createOrderApplyVariables 與實際參數不相符
        mutation({
          variables: {
            orderId,
            createOrderApplyList: {
              applicationType: type === 'refund' ? 'return' : 'replace',
              orderId /** SHOULD_NOT_BE_NULL */,
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
