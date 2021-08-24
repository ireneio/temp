/* eslint-disable max-classes-per-file */
import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import {
  Apps as AppsContext,
  Currency as CurrencyContext,
  Colors as ColorsContext,
  Role as RoleContext,
} from '@meepshop/context';
import CartContext from '@meepshop/cart';
import withContext from '@store/utils/lib/withContext';
import { NOTLOGIN, ISUSER } from 'constants/isLogin';

import { getContextData } from './gqls/decoratorsRoot';

const EnhancerContext = React.createContext({});

export const enhancer = withContext(EnhancerContext);

export default React.memo(
  ({
    /** context variables from props */
    location,

    /** context func from props */
    goTo,
    login,
    fbLogin,
    logout,
    dispatchAction,

    children,
  }) => {
    const { data } = useQuery(getContextData);
    const colors = useContext(ColorsContext);
    const apps = useContext(AppsContext);
    const { c } = useContext(CurrencyContext);
    const { cartIsOpened, toggleCart, carts } = useContext(CartContext);
    const role = useContext(RoleContext);
    const [isCartUpdating, setIsCartUpdating] = useState(false);

    return (
      <EnhancerContext.Provider
        value={{
          /** context variables from props */
          cname: data?.viewer?.store?.cname || '',
          storeSetting: {
            ...data?.viewer?.store?.setting,
            storeName: data?.viewer?.store?.description?.name || '',
            logoUrl: data?.viewer?.store?.logoImage?.scaledSrc.h200 || '',
            mobileLogoUrl:
              data?.viewer?.store?.mobileLogoImage?.scaledSrc.w250 || '',
            shippableCountries: data?.viewer?.store?.shippableCountries || [],
          },
          location,

          /** context func from props */
          goTo,
          login,
          fbLogin,
          logout,
          dispatchAction,

          isLogin: role === 'SHOPPER' ? ISUSER : NOTLOGIN,
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
        {children({
          backgroundImage: data?.getColorList?.data?.[0]?.imgInfo,
          hiddingMeepshopMaxInFooterEnabled:
            data?.viewer?.store?.experiment?.hiddingMeepshopMaxInFooterEnabled,
        })}
      </EnhancerContext.Provider>
    );
  },
);
