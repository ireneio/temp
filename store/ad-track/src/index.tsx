// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';

import { AdTrack as AdTrackContext } from '@meepshop/context';

import Head from './Head';
import useRetention from './hooks/useRetention';
import useCustom from './hooks/useCustom';
import useAddToCart from './hooks/useAddToCart';
import useViewProduct from './hooks/useViewProduct';
import useSearch from './hooks/useSearch';
import useAddToWishList from './hooks/useAddToWishList';
import useCompleteRegistration from './hooks/useCompleteRegistration';
import useBeginCheckout from './hooks/useBeginCheckout';
import usePurchase from './hooks/usePurchase';

// graphql typescript
import { getAdTrack } from './__generated__/getAdTrack';

// graphql import
import {
  storeAdTrackFbPixelFragment,
  storeAdTrackGtagFragment,
  storeAdTrackWebTrackFragment,
} from '@meepshop/apollo/lib/gqls/storeAdTrack';

import { headFragment } from './Head';
import { useRetentionFragment } from './hooks/useRetention';
import { useAddToCartFragment } from './hooks/useAddToCart';
import { useViewProductFragment } from './hooks/useViewProduct';
import { useSearchFragment } from './hooks/useSearch';
import { useAddToWishListFragment } from './hooks/useAddToWishList';
import { useCompleteRegistrationFragment } from './hooks/useCompleteRegistration';
import { useBeginCheckoutFragment } from './hooks/useBeginCheckout';
import { usePurchaseFragment } from './hooks/usePurchase';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
const query = gql`
  query getAdTrack {
    getFbPixel {
      ...storeAdTrackFbPixelFragment
    }

    getGtagList {
      ...storeAdTrackGtagFragment
    }

    getWebTrackList {
      data {
        ...storeAdTrackWebTrackFragment
      }
    }

    viewer {
      id
      store {
        id
        ...useRetentionFragment
        ...usePurchaseFragment
        adTrack @client {
          ...headFragment
          ...useAddToCartFragment
          ...useViewProductFragment
          ...useSearchFragment
          ...useAddToWishListFragment
          ...useCompleteRegistrationFragment
          ...useBeginCheckoutFragment
        }
      }
    }
  }

  ${storeAdTrackFbPixelFragment}
  ${storeAdTrackGtagFragment}
  ${storeAdTrackWebTrackFragment}
  ${headFragment}
  ${useRetentionFragment}
  ${useAddToCartFragment}
  ${useViewProductFragment}
  ${useSearchFragment}
  ${useAddToWishListFragment}
  ${useCompleteRegistrationFragment}
  ${useBeginCheckoutFragment}
  ${usePurchaseFragment}
`;

export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<getAdTrack>(query);
  const store = data?.viewer?.store;
  const adTrack = store?.adTrack;

  const custom = useCustom();
  const addToCart = useAddToCart(
    !adTrack ? null : filter(useAddToCartFragment, adTrack),
  );
  const viewProduct = useViewProduct(
    !adTrack ? null : filter(useViewProductFragment, adTrack),
  );
  const search = useSearch(
    !adTrack ? null : filter(useSearchFragment, adTrack),
  );
  const addToWishList = useAddToWishList(
    !adTrack ? null : filter(useAddToWishListFragment, adTrack),
  );
  const completeRegistration = useCompleteRegistration(
    !adTrack ? null : filter(useCompleteRegistrationFragment, adTrack),
  );
  const beginCheckout = useBeginCheckout(
    !adTrack ? null : filter(useBeginCheckoutFragment, adTrack),
  );
  const purchase = usePurchase(
    !store ? null : filter(usePurchaseFragment, store),
  );

  useRetention(!store ? null : filter(useRetentionFragment, store));

  if (!adTrack) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <>
      <Head adTrack={filter(headFragment, adTrack)} />

      <AdTrackContext.Provider
        value={{
          custom,
          addToCart,
          viewProduct,
          search,
          addToWishList,
          completeRegistration,
          beginCheckout,
          purchase,
        }}
      >
        {children}
      </AdTrackContext.Provider>
    </>
  );
});
