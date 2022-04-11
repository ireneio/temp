// typescript import
import { ValuesType } from './useProgramInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import omit from 'lodash.omit';
import { formatISO } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
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
  const router = useRouter();
  const [mutation] = useMutation<
    updateAffiliateProgramType,
    updateAffiliateProgramVariablesType
  >(updateAffiliateProgram);

  return useCallback(
    async ({
      productsType,
      affiliatePartner,
      products,
      startAt,
      endAt,
      ...values
    }) => {
      if (!affiliateProgram) {
        message.error(t('update.fail'));
        return;
      }

      const { id } = affiliateProgram;
      const newProgram = {
        ...values,
        id,
        startAt: formatISO(startAt),
        endAt: !endAt ? null : formatISO(endAt),
        allProducts: productsType === 'all',
      };

      await mutation({
        variables: {
          input: {
            ...omit(newProgram, ['endAtDisabled']),
            affiliatePartnerId: affiliatePartner.id,
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
              Omit<
                ValuesType,
                'startAt' | 'endAt' | 'endAtDisabled' | 'productsType'
              > & {
                startAt: string;
                endAt: string | null;
                allProducts: boolean;
              }
            >(affiliateProgram, {
              ...newProgram,
              affiliatePartner,
              products: products?.map(
                ({ title, coverImage, variants, ...product }) => ({
                  ...product,
                  __typename: 'Product',
                  title: !title
                    ? null
                    : {
                        ...title,
                        __typename: 'Locale',
                      },
                  coverImage: !coverImage
                    ? null
                    : {
                        ...coverImage,
                        __typename: 'Image',
                        scaledSrc: !coverImage.scaledSrc
                          ? null
                          : {
                              ...coverImage.scaledSrc,
                              __typename: 'ScaledURLs',
                            },
                      },
                  variants: !variants
                    ? null
                    : variants.map(variant =>
                        !variant
                          ? null
                          : {
                              ...variant,
                              __typename: 'Variant',
                            },
                      ),
                }),
              ),
            }),
          });
          message.success(t('update.success'));
          router.push(`/affiliate/programs/${id}`);
        },
      });
    },
    [affiliateProgram, t, router, mutation],
  );
};
