// import
import { useMutation } from '@apollo/client';

import useStopSubscription from './useStopSubscription';

// graphql typescript
import {
  stopOpenAPIFeatureSubscription as stopOpenAPIFeatureSubscriptionType,
  useStopOpenAPIFeatureSubscriptionFragment as useStopOpenAPIFeatureSubscriptionFragmentType,
  FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { stopOpenAPIFeatureSubscription } from '../gqls/useStopOpenApiFeatureSubscription';
import { useStopOpenAPIFeatureSubscriptionFragment } from '../gqls/useStopOpenApiFeatureSubscription';

// definition
export default (
  storeId: string | null,
  apiKey: string | undefined | null,
): (() => void) => {
  const [mutation] = useMutation<stopOpenAPIFeatureSubscriptionType>(
    stopOpenAPIFeatureSubscription,
    {
      update: (cache, { data }) => {
        if (
          !storeId ||
          data?.stopOpenAPIFeatureSubscription.__typename !== 'OkResponse'
        )
          return;

        cache.writeFragment<useStopOpenAPIFeatureSubscriptionFragmentType>({
          id: storeId,
          fragment: useStopOpenAPIFeatureSubscriptionFragment,
          fragmentName: 'useStopOpenAPIFeatureSubscriptionFragment',
          data: {
            __typename: 'Store',
            id: storeId,
            featureSubscription: {
              __typename: 'StoreFeatureSubscription',
              openAPIFeatureSubscription: {
                __typename: 'OpenAPIFeatureSubscription',
                status: 'SUBSCRIBE_CANCELLING' as FeatureSubscriptionStatusEnumType,
                apiKey: apiKey || null,
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

      return data?.stopOpenAPIFeatureSubscription.__typename === 'OkResponse';
    },
  });
};
