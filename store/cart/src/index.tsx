// typescript import
import { NextPage } from 'next';

// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Role as RoleContext } from '@meepshop/context';
import CheckoutSteps from '@store/checkout-steps';

import Empty from './Empty';
import Login from './Login';
import Products from './Products';
import Price from './Price';
import useCheckErrors from './hooks/useCheckErrors';
import styles from './styles/index.less';

// graphql typescript
import {
  getCartList as getCartListType,
  getCartList_getCartList_data_categories_products as getCartListGetCartListDataCategoriesProducts,
} from '@meepshop/types/gqls/store';

// graphql import
import { getCartList } from './gqls';
import { useProductsColumnsFragment } from './gqls/useProductsColumns';
import { priceFragment } from './gqls/price';

// definition
const Cart: NextPage = React.memo(() => {
  const role = useContext(RoleContext);
  const { data } = useQuery<getCartListType>(getCartList, {
    fetchPolicy: 'cache-and-network',
  });
  const order = data?.getCartList?.data?.[0];
  const products = order?.categories?.[0]?.products || [];
  const { hasError, checkErrors } = useCheckErrors(products);

  return (
    <>
      <div className={styles.root}>
        {!data ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : (
          <>
            <CheckoutSteps step="cart" />

            {!order || !products.length ? (
              <Empty />
            ) : (
              <>
                {role !== 'GUEST' ? null : <Login />}

                <Products
                  products={filter(
                    useProductsColumnsFragment,
                    products as getCartListGetCartListDataCategoriesProducts[],
                  )}
                  hasError={hasError}
                />

                <Price
                  order={filter(priceFragment, order)}
                  checkErrors={checkErrors}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
});

Cart.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Cart;
