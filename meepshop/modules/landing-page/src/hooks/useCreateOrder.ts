// typescript import
import { MutationTuple, MutationFunctionOptions } from '@apollo/client';

// import
import { useMemo, useState } from 'react';
import { useMutation, HttpLink } from '@apollo/client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import getConfig from 'next/config';

// graphql typescript
import {
  landingPageAccessToken as landingPageAccessTokenType,
  landingPageAccessTokenVariables,
  createOrderInLandingPage as createOrderInLandingPageType,
  createOrderInLandingPageVariables,
  useCreateOrderFragment as useCreateOrderFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  landingPageAccessToken,
  createOrderInLandingPage,
} from '../gqls/useCreateOrder';

// typescript definition
type createOrderType = MutationTuple<
  createOrderInLandingPageType,
  createOrderInLandingPageVariables
>;

// definition
const {
  publicRuntimeConfig: { VERSION },
} = getConfig();

export default (
  viewer: useCreateOrderFragmentType | null,
): [createOrderType[0], Pick<createOrderType[1], 'loading' | 'client'>] => {
  const firstPurchaseClient = useMemo(
    () =>
      new ApolloClient({
        name: 'landing-page',
        version: VERSION,
        cache: new InMemoryCache(),
        link: new HttpLink({
          uri: '/api/landing-page/graphql',
          credentials: 'include',
        }),
      }),
    [],
  );
  const [firstPurchaseLoading, setFirstPurchaseLoading] = useState(false);
  const [landingPageAccessTokenMutation] = useMutation<
    landingPageAccessTokenType,
    landingPageAccessTokenVariables
  >(landingPageAccessToken);
  const [createOrderInLandingPageMutation, { loading, client }] = useMutation<
    createOrderInLandingPageType,
    createOrderInLandingPageVariables
  >(createOrderInLandingPage, {
    onCompleted: async () => {
      if (!client) return;

      await client.resetStore();
    },
  });

  return useMemo(
    () =>
      viewer?.role === 'SHOPPER'
        ? [createOrderInLandingPageMutation, { loading, client }]
        : [
            // FIXME: should not use MutationFunctionOptions
            async (
              options: MutationFunctionOptions<
                createOrderInLandingPageType,
                createOrderInLandingPageVariables
              >,
            ) => {
              if (!options.variables?.input) return { errors: [] };

              const {
                variables: {
                  input: {
                    userInfo: { email },
                  },
                },
              } = options;

              if (!email) return { errors: [] };

              setFirstPurchaseLoading(true);

              const {
                data: accessTokenData,
              } = await landingPageAccessTokenMutation({
                variables: {
                  input: { email },
                },
              });

              if (accessTokenData?.landingPageAccessToken.status !== 'OK') {
                setFirstPurchaseLoading(false);

                return { errors: [] };
              }

              const {
                data: createOrderData,
                errors,
              } = await firstPurchaseClient.mutate<
                createOrderInLandingPageType,
                createOrderInLandingPageVariables
              >({
                variables: {
                  input: {
                    ...options.variables.input,
                    userId:
                      accessTokenData?.landingPageAccessToken.userId ||
                      '' /** SHOULD_NOT_BE_NULL */,
                  },
                },
                mutation: createOrderInLandingPage,
                fetchPolicy: 'no-cache',
              });

              if (client) await client.resetStore();

              setFirstPurchaseLoading(false);

              return {
                data: !createOrderData ? undefined : createOrderData,
                errors: !errors ? undefined : [...errors],
              };
            },
            { loading: firstPurchaseLoading, client },
          ],
    [
      viewer,
      firstPurchaseClient,
      firstPurchaseLoading,
      setFirstPurchaseLoading,
      landingPageAccessTokenMutation,
      createOrderInLandingPageMutation,
      loading,
      client,
    ],
  );
};
