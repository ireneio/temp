// typescript import
import { ValuesType } from './useProgramInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';
import message from '@admin/message';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  createAffiliateProgram as createAffiliateProgramType,
  createAffiliateProgramVariables as createAffiliateProgramVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { createAffiliateProgram } from '../gqls/useCreateAffiliateProgram';

// definition
export default (): ((values: ValuesType) => Promise<void>) => {
  const { t } = useTranslation('affiliate-program');
  const router = useRouter();
  const [mutation] = useMutation<
    createAffiliateProgramType,
    createAffiliateProgramVariablesType
  >(createAffiliateProgram);

  return useCallback(
    async ({ productsType, products, affiliatePartner, ...values }) => {
      await mutation({
        variables: {
          input: {
            ...values,
            endAt: values.endAt,
            affiliatePartnerId: affiliatePartner.id,
            allProducts: productsType === 'all',
            productIds:
              productsType === 'all'
                ? []
                : (products.map(({ id }) => id).filter(Boolean) as string[]),
          },
        },
        update: (_, { data }) => {
          if (data?.createAffiliateProgram.__typename !== 'AffiliateProgram') {
            message.error(t('create.fail'));
            return;
          }

          // TODO: should update cache
          router.push(`/affiliate/programs/${data.createAffiliateProgram.id}`);
        },
      });
    },
    [t, router, mutation],
  );
};
