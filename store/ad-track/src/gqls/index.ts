// import
import { gql } from '@apollo/client';

// graphql import
import { headFragment } from './head';
import { useFbqFragment } from './useFbq';
import { useRetentionFragment } from './useRetention';
import { useAddToCartFragment } from './useAddToCart';
import { useViewProductFragment } from './useViewProduct';
import { useSearchFragment } from './useSearch';
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
        ...useFbqFragment
        ...useRetentionFragment
        ...usePurchaseFragment
        adTracks {
          ...headFragment
          ...useAddToCartFragment
          ...useViewProductFragment
          ...useSearchFragment
          ...useCompleteRegistrationFragment
          ...useBeginCheckoutFragment
        }
      }
    }
  }

  ${headFragment}
  ${useFbqFragment}
  ${useRetentionFragment}
  ${useAddToCartFragment}
  ${useViewProductFragment}
  ${useSearchFragment}
  ${useCompleteRegistrationFragment}
  ${useBeginCheckoutFragment}
  ${usePurchaseFragment}
`;
