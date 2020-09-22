// typescript import
import { MutationFunction } from '@apollo/react-common';

// import
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  createOrderInLandingPage as createOrderInLandingPageType,
  createOrderInLandingPageVariables,
} from './__generated__/createOrderInLandingPage';

// graphql import
import createOrderFragment from '@meepshop/utils/lib/fragments/createOrder';

// typescript definition
interface PropsType {
  children: (data: {
    createOrderInLandingPage: MutationFunction<
      createOrderInLandingPageType,
      createOrderInLandingPageVariables
    >;
  }) => React.ReactElement;
}

// definition
const mutation = gql`
  mutation createOrderInLandingPage($createOrderList: [NewOrder]) {
    createOrderList(createOrderList: $createOrderList) {
      id
      ...createOrderFragment
    }
  }

  ${createOrderFragment}
`;

export default React.memo(({ children }: PropsType) => {
  const [createOrderInLandingPage, { client }] = useMutation<
    createOrderInLandingPageType,
    createOrderInLandingPageVariables
  >(mutation, {
    onCompleted: () => {
      if (!client) return;

      client.resetStore();
    },
  });

  return children({ createOrderInLandingPage });
});
