// typescript import
import { MutationFunction } from '@apollo/react-common';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  createOrderInLandingPage as createOrderInLandingPageType,
  createOrderInLandingPageVariables,
} from '../gqls/__generated__/createOrderInLandingPage';

// graphql import
import { createOrderInLandingPage } from '../gqls/useCreateOrder';

// definition
export default (): {
  createOrderInLandingPage: MutationFunction<
    createOrderInLandingPageType,
    createOrderInLandingPageVariables
  >;
  isCreatingOrder: boolean;
} => {
  const [mutation, { loading, client }] = useMutation<
    createOrderInLandingPageType,
    createOrderInLandingPageVariables
  >(createOrderInLandingPage, {
    onCompleted: async () => {
      if (!client) return;

      await client.resetStore();
    },
  });

  return {
    createOrderInLandingPage: mutation,
    isCreatingOrder: loading,
  };
};
