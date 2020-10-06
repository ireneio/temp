// typescript import
import { MutationTuple } from '@apollo/react-hooks/lib/types';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  addProductToCart as addProductToCartType,
  addProductToCartVariables,
} from './__generated__/addProductToCart';
import { updateCartCache } from './__generated__/updateCartCache';

// graphql import
import cartFragment from '../fragments';

// definition
const mutation = gql`
  mutation addProductToCart($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...cartFragment
    }
  }

  ${cartFragment}
`;

export default (): MutationTuple<
  addProductToCartType,
  addProductToCartVariables
>[0] => {
  const [addProductToCart] = useMutation<
    addProductToCartType,
    addProductToCartVariables
  >(mutation, {
    update: (cache, { data }) => {
      const query = gql`
        query updateCartCache {
          getCartList(search: { showDetail: true }) {
            data {
              ...cartFragment
            }
          }
        }

        ${cartFragment}
      `;

      const cartCache = cache.readQuery<updateCartCache>({
        query,
      });

      if (cartCache?.getCartList?.data?.[0] === null && data?.changeCartList)
        cache.writeQuery<updateCartCache>({
          query,
          data: {
            getCartList: {
              __typename: 'OrderList',
              data: data.changeCartList,
            },
          },
        });
    },
  });

  return addProductToCart;
};
