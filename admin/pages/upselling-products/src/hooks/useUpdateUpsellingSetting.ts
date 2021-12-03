// typescript import
import { DataProxy } from '@apollo/client';

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
  id?: string | null,
  initialValues?: ValuesType,
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
        if (!id || !initialValues) return;

        const { dates = null, limitPerOrder = null, products, ...rest } = value;
        const startTime = dates?.[0]?.toISOString() || null;
        const endTime = dates?.[1]?.toISOString() || null;

        mutation({
          variables: {
            input: {
              ...rest,
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore FIXME: input type error
              startTime,
              endTime,
              limitPerOrder,
              // SHOULD_NOT_BE_NULL
              productIds: products.map(product => product?.id || 'null-id'),
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
                products: products.map(product =>
                  !product ? null : { __typename: 'Product', id: product.id },
                ),
              },
            });
            message.success(t('success'));
          },
        });
      },
      [id, initialValues, mutation, t],
    ),
    loading,
  };
};
