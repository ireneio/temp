// import
import { useCallback, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';
import FormDataContext from '@meepshop/form-data';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  payOrderAgain as payOrderAgainType,
  payOrderAgainVariables as payOrderAgainVariablesType,
  usePayOrderAgainFragment as usePayOrderAgainFragmentType,
  PaymentTemplateEnum as PaymentTemplateEnumType,
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
  const { domain } = useRouter();
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
            redirectUrl: ['allpay', 'ecpay2'].includes(
              paymentInfo?.list?.[0]?.template as PaymentTemplateEnumType,
            )
              ? `https://${domain}/api/redirect/checkout/thank-you-page/[orderId]`
              : `https://${domain}/checkout/thank-you-page/[orderId]`,
          },
        ],
      },
    });
  }, [paymentInfo, id, payOrderAgainMutation, domain]);
};
