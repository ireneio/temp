// typescript import
import { DataProxy } from '@apollo/client';
import { FormInstance } from 'antd/lib/form';

import { ValuesType } from './useUpsellingInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  updateUpsellingSetting as updateUsellingSettingType,
  updateUpsellingSettingVariables as updateUpsellingSettingVariablesType,
  useUpdateUpsellingSettingFragment as useUpdateUpsellingSettingFragmentType,
} from '@meepshop/types/gqls/admin';

// grpahql import
import {
  updateUpsellingSetting,
  useUpdateUpsellingSettingFragment,
} from '../gqls/useUpdateUpsellingSetting';

// definition
export default (
  { setFieldsValue }: FormInstance,
  id?: string | null,
): {
  updateUpsellingSetting: (values: ValuesType) => void;
  loading: boolean;
} => {
  const { t } = useTranslation('upselling-products');
  const [mutation, { loading }] = useMutation<
    updateUsellingSettingType,
    updateUpsellingSettingVariablesType
  >(updateUpsellingSetting);

  return {
    updateUpsellingSetting: useCallback(
      value => {
        if (!id) return;

        const { dates = null, limitPerOrder = null, products, ...rest } = value;
        const startTime = dates?.[0]?.toISOString() || null;
        const endTime = dates?.[1]?.toISOString() || null;

        mutation({
          variables: {
            input: {
              ...rest,
              startTime,
              endTime,
              limitPerOrder,
              hasLimitPerOrder: Boolean(limitPerOrder),
              // SHOULD_NOT_BE_NULL
              productIds: products.map(product => product.id || 'null-id'),
            },
          },
          update: (
            cache: DataProxy,
            { data }: { data?: updateUsellingSettingType },
          ) => {
            const response = data?.updateUpsellingSetting;

            if (response?.__typename !== 'OkResponse') {
              message.error(`${t('error')}: ${response?.message}`);
              return;
            }

            cache.writeFragment<useUpdateUpsellingSettingFragmentType>({
              id,
              fragment: useUpdateUpsellingSettingFragment,
              data: {
                ...rest,
                __typename: 'UpsellingSetting',
                startTime,
                endTime,
                limitPerOrder,
                hasLimitPerOrder: Boolean(limitPerOrder),
                products: products.map(product => ({
                  __typename: 'Product',
                  // SHOULD_NOT_BE_NULL
                  id: product?.id || 'null-id',
                })),
              },
            });
            setFieldsValue({ hasLimitPerOrder: Boolean(limitPerOrder) });
            message.success(t('success'));
          },
        });
      },
      [id, mutation, setFieldsValue, t],
    ),
    loading,
  };
};
