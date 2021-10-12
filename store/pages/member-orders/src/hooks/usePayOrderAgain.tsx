// import
import { useCallback, useContext } from 'react';
import { message } from 'antd';

import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from '@meepshop/locales';
import FormDataContext from '@meepshop/form-data';

// graphql typescript
import {
  payOrderAgain as payOrderAgainType,
  payOrderAgainVariables as payOrderAgainVariablesType,
  usePayOrderAgainFragment as usePayOrderAgainFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { payOrderAgain } from '../gqls/usePayOrderAgain';

// definition
export default ({
  id,
  paymentInfo,
}: usePayOrderAgainFragmentType): (() => void) => {
  const { t } = useTranslation('member-orders');
  const setFormData = useContext(FormDataContext);
  const [payOrderAgainMutation] = useMutation<
    payOrderAgainType,
    payOrderAgainVariablesType
  >(payOrderAgain, {
    onCompleted: ({ paymentAgainOrderList }: payOrderAgainType): void => {
      const newFormData = paymentAgainOrderList?.[0]?.formData;

      if (!newFormData?.url) {
        message.error(t('pay-again.fail'));
        setFormData(null);
      } else {
        message.success(t('pay-again.success'));
        setFormData(newFormData);
      }
    },
  });

  return useCallback(() => {
    payOrderAgainMutation({
      variables: {
        paymentAgainOrderList: [
          {
            orderId: id || 'null-id', // SHOULD_NOT_BE_NULL
            paymentId: paymentInfo?.list?.[0]?.paymentId || 'null-id', // SHOULD_NOT_BE_NULL
          },
        ],
      },
    });
  }, [paymentInfo, id, payOrderAgainMutation]);
};
