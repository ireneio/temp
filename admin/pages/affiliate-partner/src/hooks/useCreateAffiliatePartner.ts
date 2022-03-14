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
} from '@meepshop/types/gqls/admin';

// graphql import
import { createAffiliatePartner } from '../gqls/useCreateAffiliatePartner';

// definition
export default (): ((values: valuesType) => Promise<void>) => {
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
        update: (_, { data }) => {
          if (data?.createAffiliatePartner?.__typename !== 'AffiliatePartner') {
            message.error(t('create.fail'));
            return;
          }

          // TODO: should update cache
          router.push('/affiliate/partners');
        },
      });
    },
    [t, router, mutation],
  );
};
