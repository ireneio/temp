// import
import gql from 'graphql-tag';

// graphql import
import { headFragment } from './head';
import { useRetentionFragment } from './useRetention';
import { useAddToCartFragment } from './useAddToCart';
import { useViewProductFragment } from './useViewProduct';
import { useSearchFragment } from './useSearch';
import { useAddToWishListFragment } from './useAddToWishList';
import { useCompleteRegistrationFragment } from './useCompleteRegistration';
import { useBeginCheckoutFragment } from './useBeginCheckout';
import { usePurchaseFragment } from './usePurchase';

// definition
export const getAdTrack = gql`
  query getAdTrack {
    viewer {
      id
      store {
        id
        ...useRetentionFragment
        ...usePurchaseFragment
        adTracks {
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
