// typescript import
import { ValuesType } from './useProgramInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { formatISO } from 'date-fns';
import omit from 'lodash.omit';

import { useTranslation } from '@meepshop/locales';
import message from '@admin/message';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  createAffiliateProgram as createAffiliateProgramType,
  createAffiliateProgramVariables as createAffiliateProgramVariablesType,
  useCreateAffiliateProgramFragment as useCreateAffiliateProgramFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  createAffiliateProgram,
  useCreateAffiliateProgramFragment,
} from '../gqls/useCreateAffiliateProgram';

// definition
export default (
  viewer: useCreateAffiliateProgramFragmentType | null,
): ((values: ValuesType) => Promise<void>) => {
  const { t } = useTranslation('affiliate-program');
  const router = useRouter();
  const [mutation] = useMutation<
    createAffiliateProgramType,
    createAffiliateProgramVariablesType
  >(createAffiliateProgram);

  return useCallback(
    async ({
      productsType,
      affiliatePartner,
      products,
      startAt,
      endAt,
      ...values
    }) => {
      await mutation({
        variables: {
          input: {
            ...omit(values, ['endAtDisabled']),
            startAt: formatISO(startAt),
            endAt: !endAt ? null : formatISO(endAt),
            allProducts: productsType === 'all',
            affiliatePartnerId: affiliatePartner.id,
            productIds:
              productsType === 'all'
                ? []
                : (products.map(({ id }) => id).filter(Boolean) as string[]),
          },
        },
        update: (cache, { data }) => {
          if (data?.createAffiliateProgram.__typename !== 'AffiliateProgram') {
            message.error(t('create.fail'));
            return;
          }

          const { id } = data.createAffiliateProgram;

          if (viewer?.id)
            cache.writeFragment<useCreateAffiliateProgramFragmentType>({
              id: viewer.id,
              fragment: useCreateAffiliateProgramFragment,
              data: {
                ...viewer,
                affiliatePrograms: !viewer.affiliatePrograms
                  ? null
                  : {
                      ...viewer.affiliatePrograms,
                      edges: [
                        {
                          __typename: 'AffiliateProgramEdge',
                          node: {
                            __typename: 'AffiliateProgram',
                            id,
                          },
                        },
                        ...viewer.affiliatePrograms.edges,
                      ],
                      total: viewer.affiliatePrograms.total + 1,
                    },
              },
            });

          router.push(`/affiliate/programs/${id}`);
        },
      });
    },
    [viewer, t, router, mutation],
  );
};
