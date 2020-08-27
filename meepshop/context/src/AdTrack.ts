// import
import React from 'react';
import { emptyFunction } from 'fbjs';

// typescript definition
type customType = (
  action: string,
  name: string,
  category: string | null,
) => void;

type addToCartType = (options: {
  eventName: 'ec-popup' | 'ec' | 'lp';
  id: string;
  title: {
    zh_TW: string;
  };
  quantity: number;
  sku: string;
  specs:
    | [
        {
          title: {
            zh_TW: string;
          };
        },
      ]
    | null;
  price: number;
}) => void;

type viewProductType = (options: {
  id: string;
  title: {
    zh_TW: string;
  };
  price: string;
}) => void;

type searchType = (options: {
  searchString: string;
  products: {
    id: string;
    title: {
      zh_TW: string;
    };
  }[];
}) => void;

type addToWishListType = () => void;

type completeRegistrationType = () => void;

type beginCheckoutType = (options: { total: number }) => void;

type purchaseType = (options: {
  orderNo: string;
  products: {
    productId: string;
    sku: string;
    type: string;
    title: {
      zh_TW: string;
    };
    specs: {
      title: {
        zh_TW: string;
      };
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
export default React.createContext<AdTrackType>({
  custom: emptyFunction,
  addToCart: emptyFunction,
  viewProduct: emptyFunction,
  search: emptyFunction,
  addToWishList: emptyFunction,
  completeRegistration: emptyFunction,
  beginCheckout: emptyFunction,
  purchase: emptyFunction,
});
