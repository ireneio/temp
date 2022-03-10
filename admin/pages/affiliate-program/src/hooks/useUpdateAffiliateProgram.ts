// typescript import
import { ValuesType } from './useProgramInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';
import message from '@admin/message';
import merge from '@meepshop/utils/lib/merge';

// graphql typescript
import {
  updateAffiliateProgram as updateAffiliateProgramType,
  updateAffiliateProgramVariables as updateAffiliateProgramVariablesType,
  useUpdateAffiliateProgramFragment as useUpdateAffiliateProgramFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  updateAffiliateProgram,
  useUpdateAffiliateProgramFragment,
} from '../gqls/useUpdateAffiliateProgram';

// definition
export default (
  affiliateProgram: useUpdateAffiliateProgramFragmentType | null,
): ((values: ValuesType) => Promise<void>) => {
  const { t } = useTranslation('affiliate-program');
  const [mutation] = useMutation<
    updateAffiliateProgramType,
    updateAffiliateProgramVariablesType
  >(updateAffiliateProgram);

  return useCallback(
    async ({ productsType, products, ...values }) => {
      if (!affiliateProgram) {
        message.error(t('update.fail'));
        return;
      }

      const { id } = affiliateProgram;

      await mutation({
        variables: {
          input: {
            ...values,
            id,
            productIds:
              productsType === 'all'
                ? []
                : (products
                    .map(({ id: productId }) => productId)
                    .filter(Boolean) as string[]),
          },
        },
        update: (cache, { data }) => {
          if (data?.updateAffiliateProgram?.__typename !== 'OkResponse') {
            message.error(t('update.fail'));
            return;
          }

          cache.writeFragment<useUpdateAffiliateProgramFragmentType>({
            id,
            fragment: useUpdateAffiliateProgramFragment,
            fragmentName: 'useUpdateAffiliateProgramFragment',
            data: merge<
              useUpdateAffiliateProgramFragmentType,
              Omit<ValuesType, 'productsType'>
            >(affiliateProgram, { ...values, products }),
          });
          message.success(t('update.success'));
        },
      });
    },
    [affiliateProgram, t, mutation],
  );
};
