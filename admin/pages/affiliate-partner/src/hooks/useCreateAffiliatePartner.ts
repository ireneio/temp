// typescript import
import { valuesType } from './usePartnerInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';
import message from '@admin/message';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  createAffiliatePartner as createAffiliatePartnerType,
  createAffiliatePartnerVariables as createAffiliatePartnerVariablesType,
  useCreateAffiliatePartnerFragment as useCreateAffiliatePartnerFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  createAffiliatePartner,
  useCreateAffiliatePartnerFragment,
} from '../gqls/useCreateAffiliatePartner';

// definition
export default (
  viewer: useCreateAffiliatePartnerFragmentType | null,
): ((values: valuesType) => Promise<void>) => {
  const { t } = useTranslation('affiliate-partner');
  const router = useRouter();
  const [mutation] = useMutation<
    createAffiliatePartnerType,
    createAffiliatePartnerVariablesType
  >(createAffiliatePartner);

  return useCallback(
    async values => {
      await mutation({
        variables: {
          input: values,
        },
        update: (cache, { data }) => {
          if (data?.createAffiliatePartner?.__typename !== 'AffiliatePartner') {
            message.error(t('create.fail'));
            return;
          }

          if (viewer?.id)
            cache.writeFragment<useCreateAffiliatePartnerFragmentType>({
              id: viewer.id,
              fragment: useCreateAffiliatePartnerFragment,
              data: {
                ...viewer,
                affiliatePartners: !viewer.affiliatePartners
                  ? null
                  : {
                      ...viewer.affiliatePartners,
                      edges: [
                        {
                          __typename: 'AffiliatePartnerEdge',
                          node: {
                            __typename: 'AffiliatePartner',
                            id: data.createAffiliatePartner.id,
                          },
                        },
                        ...viewer.affiliatePartners.edges,
                      ],
                      total: viewer.affiliatePartners.total + 1,
                    },
              },
            });

          router.push('/affiliate/partners');
        },
      });
    },
    [viewer, t, router, mutation],
  );
};
