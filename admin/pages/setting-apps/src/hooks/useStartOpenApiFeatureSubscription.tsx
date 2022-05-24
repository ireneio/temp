// import
import React from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsOpenAPI_w64_h64 as adminSettingAppsOpenAPI } from '@meepshop/images';

import styles from '../styles/useStartOpenApiFeatureSubscription.less';
import useStartSubscription from './useStartSubscription';

// graphql typescript
import {
  startOpenAPIFeatureSubscription as startOpenApiFeatureSubscriptionType,
  startOpenAPIFeatureSubscriptionVariables as startOpenApiFeatureSubscriptionVariablesType,
  useStartOpenApiFeatureSubscriptionFragment as useStartOpenApiFeatureSubscriptionFragmentType,
  FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { startOpenAPIFeatureSubscription } from '../gqls/useStartOpenApiFeatureSubscription';
import { useStartOpenApiFeatureSubscriptionFragment } from '../gqls/useStartOpenApiFeatureSubscription';

// definition
export default (storeId: string | null, isRenew: boolean): (() => void) => {
  const { t } = useTranslation('setting-apps');
  const [mutation] = useMutation<
    startOpenApiFeatureSubscriptionType,
    startOpenApiFeatureSubscriptionVariablesType
  >(startOpenAPIFeatureSubscription, {
    update: (cache, { data }) => {
      const result =
        data?.startOpenAPIFeatureSubscription ||
        data?.renewOpenAPIFeatureSubscription;

      if (!storeId || result?.__typename !== 'OpenAPIFeatureSubscription')
        return;

      cache.writeFragment<useStartOpenApiFeatureSubscriptionFragmentType>({
        id: storeId,
        fragment: useStartOpenApiFeatureSubscriptionFragment,
        fragmentName: 'useStartOpenApiFeatureSubscriptionFragment',
        data: {
          __typename: 'Store',
          id: storeId,
          featureSubscription: {
            __typename: 'StoreFeatureSubscription',
            openAPIFeatureSubscription: {
              __typename: 'OpenAPIFeatureSubscription',
              status: 'SUBSCRIBE_CONTINUING' as FeatureSubscriptionStatusEnumType,
              apiKey: result.apiKey,
            },
          },
        },
      });
    },
  });

  return useStartSubscription({
    key: 'open-api',
    img: adminSettingAppsOpenAPI,
    price: <div className={styles.price}>{t('open-api.price')}</div>,
    featureAmount: 4,
    submit: async () => {
      const { data } = await mutation({
        variables: {
          isRenew,
        },
      });

      return (
        data?.startOpenAPIFeatureSubscription?.__typename ===
          'OpenAPIFeatureSubscription' ||
        data?.renewOpenAPIFeatureSubscription?.__typename ===
          'OpenAPIFeatureSubscription'
      );
    },
    successTitle: t('open-api.start.success.title'),
  });
};
