/* eslint-disable max-classes-per-file */
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import {
  Apps as AppsContext,
  Currency as CurrencyContext,
  Colors as ColorsContext,
  Role as RoleContext,
} from '@meepshop/context';
import CartContext from '@meepshop/cart';
import { useRouter } from '@meepshop/link';
import withContext from '@store/utils/lib/withContext';
import { NOTLOGIN, ISUSER } from 'constants/isLogin';

import {
  getContextData,
  getProductInDecoratorsRoot,
} from './gqls/decoratorsRoot';

const EnhancerContext = React.createContext({});

export const enhancer = withContext(EnhancerContext);

export default React.memo(
  ({
    /** context variables from props */
    location,

    /** context func from props */
    goTo,

    children,
  }) => {
    const { data } = useQuery(getContextData);
    const { query } = useRouter();
    const { data: productInContext } = useQuery(getProductInDecoratorsRoot, {
      skip: !query.pId,
      variables: {
        productSearch: {
          size: 1,
          from: 0,
          filter: {
            and: [
              {
                type: 'ids',
                ids: [query.pId],
              },
            ],
          },
          sort: [
            {
              field: 'createdAt',
              order: 'desc',
            },
          ],
          showVariants: true,
          showMainFile: true,
        },
      },
    });
    const colors = useContext(ColorsContext);
    const apps = useContext(AppsContext);
    const { c } = useContext(CurrencyContext);
    const { carts } = useContext(CartContext);
    const role = useContext(RoleContext);

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
          productInContext:
            productInContext?.computeProductList?.data?.[0] || null,
          location,

          /** context func from props */
          goTo,

          isLogin: role === 'SHOPPER' ? ISUSER : NOTLOGIN,
          user: data?.viewer || null,
          stockNotificationList: data?.getStockNotificationList?.data || [],
          colors,
          hasStoreAppPlugin: pluginName => apps[pluginName].isInstalled,
          transformCurrency: c,
          carts,
        }}
      >
        {children({
          backgroundImage: data?.getColorList?.data?.[0]?.imgInfo,
          hiddingMeepshopMaxInFooterEnabled:
            data?.viewer?.store?.hiddingMeepshopMaxInFooterEnabled,
        })}
      </EnhancerContext.Provider>
    );
  },
);
