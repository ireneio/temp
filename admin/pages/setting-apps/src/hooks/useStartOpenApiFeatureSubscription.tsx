// import
import React from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsOpenAPI_w64_h64 as adminSettingAppsOpenAPI } from '@meepshop/images';

import styles from '../styles/useStartOpenApiFeatureSubscription.less';
import useStartSubscription from './useStartSubscription';

// graphql typescript
import {
  startOpenApiFeatureSubscription as startOpenApiFeatureSubscriptionType,
  startOpenApiFeatureSubscriptionVariables as startOpenApiFeatureSubscriptionVariablesType,
  useStartOpenApiFeatureSubscriptionFragment as useStartOpenApiFeatureSubscriptionFragmentType,
  FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { startOpenApiFeatureSubscription } from '../gqls/useStartOpenApiFeatureSubscription';
import { useStartOpenApiFeatureSubscriptionFragment } from '../gqls/useStartOpenApiFeatureSubscription';

// definition
export default (storeId: string | null, isRenew: boolean): (() => void) => {
  const { t } = useTranslation('setting-apps');
  const [mutation] = useMutation<
    startOpenApiFeatureSubscriptionType,
    startOpenApiFeatureSubscriptionVariablesType
  >(startOpenApiFeatureSubscription, {
    update: (cache, { data }) => {
      const result =
        data?.startOpenApiFeatureSubscription ||
        data?.renewOpenApiFeatureSubscription;

      if (!storeId || result?.__typename !== 'OpenApiFeatureSubscription')
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
            openApiFeatureSubscription: {
              __typename: 'OpenApiFeatureSubscription',
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
        data?.startOpenApiFeatureSubscription?.__typename ===
          'OpenApiFeatureSubscription' ||
        data?.renewOpenApiFeatureSubscription?.__typename ===
          'OpenApiFeatureSubscription'
      );
    },
    successTitle: t('open-api.start.success.title'),
  });
};
