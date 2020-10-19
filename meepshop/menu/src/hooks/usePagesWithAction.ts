// typescript import
import { PropsType } from '../MenuItem';

// import
import { useMemo, useContext } from 'react';

import { Apps as AppsContext } from '@meepshop/context';

import { ACION_TYPES } from '../constants';

// graphql typescript
import { usePagesWithActionUserFragment as usePagesWithActionUserFragmentType } from '../gqls/__generated__/usePagesWithActionUserFragment';
import { usePagesWithActionMenuPageObjectTypeFragment as usePagesWithActionMenuPageObjectTypeFragmentType } from '../gqls/__generated__/usePagesWithActionMenuPageObjectTypeFragment';

// definition
export default (
  user: usePagesWithActionUserFragmentType | null,
  page: usePagesWithActionMenuPageObjectTypeFragmentType,
): PropsType['page']['pages'] => {
  const apps = useContext(AppsContext);

  return useMemo(() => {
    const { action } = page;
    const { locale, currency } = user?.store?.setting || {};

    switch (ACION_TYPES[action || 0]) {
      case 'CART':
        return [];

      case 'MEMBER':
        return user?.role !== 'SHOPPER'
          ? []
          : [
              'orders',
              'settings',
              'recipients',
              'passwordChange',
              ...(apps.wishList.isInstalled ? ['wishlist'] : []),
              'rewardPoints',
              'logout',
            ].map((key: string) => ({
              __typename: 'MenuPageObjectType',
              id: key,
              action: ACION_TYPES.indexOf(
                key
                  .replace(/[A-Z]/g, str => `_${str.toLowerCase()}`)
                  .toUpperCase(),
              ),
              image: null,
              imagePosition: null,
              newWindow: false,
              title: null,
              params:
                key === 'logout'
                  ? null
                  : {
                      __typename: 'MenuPageParamsObjectType',
                      url: `/${key}`,
                      displayMemberGroup: false,
                      pageId: null,
                      path: null,
                      offset: null,
                      limit: null,
                      search: null,
                      sort: null,
                      price: null,
                      tags: null,
                    },
            }));

      case 'LOCALE':
        return (locale || []).map((key: string) => ({
          __typename: 'MenuPageObjectType',
          id: key,
          action: ACION_TYPES.indexOf(key),
          image: null,
          imagePosition: null,
          newWindow: false,
          title: null,
          params: null,
        }));

      case 'CURRENCY':
        return (currency || []).map((key: string) => ({
          __typename: 'MenuPageObjectType',
          id: key,
          action: ACION_TYPES.indexOf(key),
          image: null,
          imagePosition: null,
          newWindow: false,
          title: null,
          params: null,
        }));

      default:
        return null;
    }
  }, [user, page, apps]);
};
