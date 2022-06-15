// import
import React from 'react';
import { emptyFunction } from 'fbjs';

// graphql import
import { localeFragment as localeFragmentType } from '@meepshop/types/gqls/meepshop';

// typescript definition
type customType = (
  action: string,
  name: string,
  category: string | null,
) => void;

type addToCartType = (options: {
  eventName: 'ec-popup' | 'ec' | 'lp' | 'upselling';
  id: string;
  title: localeFragmentType | null;
  quantity: number;
  specs:
    | ({
        title: localeFragmentType | null;
      } | null)[]
    | null;
  price: number;
}) => void;

type viewProductType = (options: {
  id: string;
  title: localeFragmentType | null;
  price: string;
}) => void;

type searchType = (options: {
  searchString: string;
  products: {
    id: string;
    title: localeFragmentType;
  }[];
}) => void;

type addToWishListType = () => void;

type completeRegistrationType = () => void;

type beginCheckoutType = (options: {
  products: {
    id: string;
    type: string;
    title: localeFragmentType | null;
    specs: {
      title: localeFragmentType | null;
    }[];
    totalPrice: number;
    quantity: number;
  }[];
  total: number;
}) => void;

type purchaseType = (options: {
  orderNo: string;
  products: {
    id: string;
    productId: string;
    type: string;
    title: localeFragmentType;
    specs: {
      title: localeFragmentType;
    }[];
    totalPrice: number;
    quantity: number;
  }[];
  total: number;
  currency: string;
  shipmentFee: number;
  paymentFee: number;
}) => void;

export interface AdTrackType {
  custom: customType;
  addToCart: addToCartType;
  viewProduct: viewProductType;
  search: searchType;
  addToWishList: addToWishListType;
  completeRegistration: completeRegistrationType;
  beginCheckout: beginCheckoutType;
  purchase: purchaseType;
}

// definition
export const defaultAdTrack = {
  custom: emptyFunction,
  addToCart: emptyFunction,
  viewProduct: emptyFunction,
  search: emptyFunction,
  addToWishList: emptyFunction,
  completeRegistration: emptyFunction,
  beginCheckout: emptyFunction,
  purchase: emptyFunction,
};

export default React.createContext<AdTrackType>(defaultAdTrack);
