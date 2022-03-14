// typescript import
import { valuesType } from './usePartnerInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';
import message from '@admin/message';
import merge from '@meepshop/utils/lib/merge';

// graphql typescript
import {
  updateAffiliatePartner as updateAffiliatePartnerType,
  updateAffiliatePartnerVariables as updateAffiliatePartnerVariablesType,
  useUpdateAffiliatePartnerFragment as useUpdateAffiliatePartnerFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  updateAffiliatePartner,
  useUpdateAffiliatePartnerFragment,
} from '../gqls/useUpdateAffiliatePartner';

// definition
export default (
  affiliatePartner: useUpdateAffiliatePartnerFragmentType | null,
): ((values: valuesType) => Promise<void>) => {
  const { t } = useTranslation('affiliate-partner');
  const [mutation] = useMutation<
    updateAffiliatePartnerType,
    updateAffiliatePartnerVariablesType
  >(updateAffiliatePartner);

  return useCallback(
    async values => {
      if (!affiliatePartner) {
        message.error(t('update.fail'));
        return;
      }

      const { id } = affiliatePartner;

      await mutation({
        variables: {
          input: {
            ...values,
            id,
          },
        },
        update: (cache, { data }) => {
          if (data?.updateAffiliatePartner?.__typename !== 'OkResponse') {
            message.error(t('update.fail'));
            return;
          }

          cache.writeFragment<useUpdateAffiliatePartnerFragmentType>({
            id,
            fragment: useUpdateAffiliatePartnerFragment,
            fragmentName: 'useUpdateAffiliatePartnerFragment',
            data: merge<useUpdateAffiliatePartnerFragmentType, valuesType>(
              affiliatePartner,
              values,
            ),
          });
          message.success(t('update.success'));
        },
      });
    },
    [affiliatePartner, t, mutation],
  );
};
