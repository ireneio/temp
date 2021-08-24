// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { filter } from 'graphql-anywhere';

import {
  Colors as ColorsContext,
  Role as RoleContext,
} from '@meepshop/context';
import CheckoutSteps from '@store/checkout-steps';

import Empty from './Empty';
import Login from './Login';
import Products from './Products';
import Price from './Price';
import useCheckErrors from './hooks/useCheckErrors';
import styles from './styles/index.less';

// graphql typescript
import { getCartList as getCartListType } from '@meepshop/types/gqls/store';
import { useProductsColumnsFragment as useProductsColumnsFragmentType } from '@meepshop/types/gqls/store';
import { priceFragment_activityInfo as priceFragmentActivityInfoType } from '@meepshop/types/gqls/store';

// graphql import
import { getCartList } from './gqls';
import { useProductsColumnsFragment } from './gqls/useProductsColumns';

// definition
export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const role = useContext(RoleContext);
  const { data } = useQuery<getCartListType>(getCartList);
  const order = data?.getCartList?.data?.[0];
  const products = order?.categories?.[0]?.products || [];
  const { hasError, checkErrors } = useCheckErrors(products);

  if (!order) return <Spin indicator={<LoadingOutlined spin />} />;

  const activities = order.activityInfo || [];
  const price = order.priceInfo;

  return (
    <>
      <div className={styles.root}>
        <CheckoutSteps step="cart" />

        {!products.length ? (
          <Empty />
        ) : (
          <>
            {role !== 'GUEST' ? null : <Login />}

            <Products
              products={filter(
                useProductsColumnsFragment,
                products.filter(Boolean) as useProductsColumnsFragmentType[],
              )}
              hasError={hasError}
            />

            <Price
              activities={
                activities.filter(Boolean) as priceFragmentActivityInfoType[]
              }
              price={price}
              checkErrors={checkErrors}
            />
          </>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} {
              background-color: ${colors[0]};
            }
          `,
        }}
      />
    </>
  );
});
