// import
import { useMutation } from '@apollo/client';

import useStopSubscription from './useStopSubscription';

// graphql typescript
import {
  stopOpenApiFeatureSubscription as stopOpenApiFeatureSubscriptionType,
  useStopOpenApiFeatureSubscriptionFragment as useStopOpenApiFeatureSubscriptionFragmentType,
  FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { stopOpenApiFeatureSubscription } from '../gqls/useStopOpenApiFeatureSubscription';
import { useStopOpenApiFeatureSubscriptionFragment } from '../gqls/useStopOpenApiFeatureSubscription';

// definition
export default (storeId: string | null): (() => void) => {
  const [mutation] = useMutation<stopOpenApiFeatureSubscriptionType>(
    stopOpenApiFeatureSubscription,
    {
      update: (cache, { data }) => {
        if (
          !storeId ||
          data?.stopOpenApiFeatureSubscription.__typename !== 'OkResponse'
        )
          return;

        cache.writeFragment<useStopOpenApiFeatureSubscriptionFragmentType>({
          id: storeId,
          fragment: useStopOpenApiFeatureSubscriptionFragment,
          fragmentName: 'useStopOpenApiFeatureSubscriptionFragment',
          data: {
            __typename: 'Store',
            id: storeId,
            featureSubscription: {
              __typename: 'StoreFeatureSubscription',
              openApiFeatureSubscription: {
                __typename: 'OpenApiFeatureSubscription',
                status: 'SUBSCRIBE_CANCELLING' as FeatureSubscriptionStatusEnumType,
                apiKey: null,
              },
            },
          },
        });
      },
    },
  );

  return useStopSubscription({
    key: 'open-api',
    submit: async () => {
      const { data } = await mutation();

      return data?.stopOpenApiFeatureSubscription.__typename === 'OkResponse';
    },
  });
};
