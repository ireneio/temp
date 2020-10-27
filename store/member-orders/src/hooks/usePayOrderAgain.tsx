// import
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { message } from 'antd';

import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  payOrderAgain as payOrderAgainType,
  payOrderAgainVariables as payOrderAgainVariablesType,
  payOrderAgain_paymentAgainOrderList_formData as payOrderAgainPaymentAgainOrderListFormDataType,
} from '../gqls/__generated__/payOrderAgain';
import { usePayOrderAgainFragment as usePayOrderAgainFragmentType } from '../gqls/__generated__/usePayOrderAgainFragment';

// graphql import
import { payOrderAgain } from '../gqls/actions';

// definition
export default ({
  id,
  paymentInfo,
}: usePayOrderAgainFragmentType): {
  payOrderAgain: () => void;
  form: {
    url: string;
    params: string[][];
    ref: React.Ref<HTMLFormElement>;
  };
} => {
  const { t } = useTranslation('member-orders');

  const [
    formData,
    setFormData,
  ] = useState<payOrderAgainPaymentAgainOrderListFormDataType | null>(null);

  const ref = useRef<HTMLFormElement>(null);

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

  useEffect(() => {
    if (formData && ref.current) ref.current.submit();
  }, [formData]);

  return {
    form: useMemo(() => {
      const formDataParams = formData?.params || {};
      const params = Object.keys(formDataParams).reduce(
        (result, key: keyof typeof formDataParams) =>
          key === '__typename' || !formDataParams[key]
            ? result
            : [
                ...result,
                [key, key === 'orderdesc' ? ' ' : formDataParams[key]],
              ],
        [],
      );
      return {
        ref,
        url: formData?.url || '',
        params,
      };
    }, [formData, ref]),
    payOrderAgain: useCallback(() => {
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
    }, [paymentInfo, id, payOrderAgainMutation]),
  };
};
