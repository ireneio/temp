// import
import { useContext, useEffect } from 'react';
import { filter } from 'graphql-anywhere';

import { Role as RoleContext } from '@meepshop/context';

import useMergeCart from './useMergeCart';
import useUpsertCart from './useUpsertCart';

// graphql typescript
import {
  useCartFragment as useCartFragmentType,
  useMergeCartCartItemFragment as useMergeCartCartItemFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { useMergeCartUserFragment } from './gqls/useMergeCart';
import { useUpsertCartUserFragment } from './gqls/useUpsertCart';

// typescript definition
interface PropsType {
  viewer: useCartFragmentType;
}

// definition
export default ({ viewer }: PropsType): useMergeCartCartItemFragmentType[] => {
  const isShopper = useContext(RoleContext) === 'SHOPPER';
  const mergedCart = useMergeCart(filter(useMergeCartUserFragment, viewer));
  const upsertCart = useUpsertCart(filter(useUpsertCartUserFragment, viewer));
  const { guestCart } = viewer;

  useEffect(() => {
    if (isShopper && guestCart.length > 0) {
      upsertCart(mergedCart);
      localStorage.removeItem('guestCart');
    }
  }, [guestCart, isShopper, mergedCart, upsertCart]);

  return mergedCart;
};
