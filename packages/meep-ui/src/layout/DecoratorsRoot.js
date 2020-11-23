/* eslint-disable max-classes-per-file */
import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import {
  Apps as AppsContext,
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import CartContext from '@meepshop/cart';
import withContext from '@store/utils/lib/withContext';

const EnhancerContext = React.createContext({});
const query = gql`
  query getContextData {
    viewer {
      id
      name
      email
      role
      memberGroup {
        id
        name
      }

      wishList: wishlist {
        id
        productId
      }
    }

    getStockNotificationList {
      data {
        variantId
      }
    }
  }
`;

export const enhancer = withContext(EnhancerContext);

export default React.memo(
  ({
    /** context variables from props */
    cname,
    isLogin,
    storeSetting,
    location,

    /** context func from props */
    goTo,
    getData,
    login,
    fbLogin,
    logout,
    dispatchAction,

    children,
  }) => {
    const { data } = useQuery(query);
    const colors = useContext(ColorsContext);
    const apps = useContext(AppsContext);
    const { c } = useContext(CurrencyContext);
    const { cartIsOpened, toggleCart, carts } = useContext(CartContext);
    const [isCartUpdating, setIsCartUpdating] = useState(false);

    return (
      <EnhancerContext.Provider
        value={{
          /** context variables from props */
          cname,
          isLogin,
          storeSetting,
          location,

          /** context func from props */
          goTo,
          getData,
          login,
          fbLogin,
          logout,
          dispatchAction,

          user: data?.viewer || null,
          stockNotificationList: data?.getStockNotificationList?.data || [],
          colors,
          hasStoreAppPlugin: pluginName => apps[pluginName].isInstalled,
          transformCurrency: c,
          isShowCart: cartIsOpened,
          toggleCart,
          carts,

          isCartUpdating,
          updateCart: setIsCartUpdating,
        }}
      >
        {children}
      </EnhancerContext.Provider>
    );
  },
);
