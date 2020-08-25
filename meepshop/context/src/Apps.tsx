// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';

// graphql typescript
import { getApps } from './__generated__/getApps';

// typescript definition
export type AppsType = Record<
  | 'webTrack'
  | 'memberGroup'
  | 'freeGift'
  | 'freeShipping'
  | 'bulkdiscount'
  | 'groupDiscount'
  | 'productDiscount'
  | 'points'
  | 'newsletters'
  | 'analytics'
  | 'productAuthority'
  | 'productMassUpdate'
  | 'memberGroupCode'
  | 'coupon'
  | 'tagDiscount'
  | 'productNotice'
  | 'returnOrder'
  | 'replacement'
  | 'memberSeePrice'
  | 'gooddeal'
  | 'wishList',
  {
    id: string;
    storeAppId: string | null;
    isInstalled: boolean;
  }
>;

// definition
const defaultApps = [
  'webTrack',
  'memberGroup',
  'freeGift',
  'freeShipping',
  'bulkdiscount',
  'groupDiscount',
  'productDiscount',
  'points',
  'newsletters',
  'analytics',
  'productAuthority',
  'productMassUpdate',
  'memberGroupCode',
  'coupon',
  'tagDiscount',
  'productNotice',
  'returnOrder',
  'replacement',
  'memberSeePrice',
  'gooddeal',
  'wishList',
].reduce(
  (result: AppsType, key: keyof AppsType) => ({
    ...result,
    [key]: {
      id: key,
      storeAppId: null,
      isInstalled: false,
    },
  }),
  {} as AppsType,
);
const AppsContext = React.createContext<typeof defaultApps>(defaultApps);

const query = gql`
  query getApps {
    getStoreAppList {
      data {
        id
        appId
        plugin
        isInstalled
      }
    }

    getAppList {
      data {
        id
        plugin
      }
    }
  }
`;

export const AppsProvider = React.memo(({ children }) => {
  const { data } = useQuery<getApps>(query);
  const apps = useMemo(
    () =>
      (data?.getAppList?.data || []).reduce((result: AppsType, app) => {
        const id = app?.id;
        const plugin = app?.plugin as keyof AppsType;

        if (!id || !plugin) return result;

        const { id: storeAppId = null, isInstalled } =
          data?.getStoreAppList?.data?.find(
            storeApp => storeApp?.plugin === plugin,
          ) || {};

        return {
          ...result,
          [plugin]: {
            ...result[plugin],
            id,
            storeAppId,
            isInstalled: Boolean(storeAppId && isInstalled),
          },
        };
      }, defaultApps),
    [data],
  );

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return <AppsContext.Provider value={apps}>{children}</AppsContext.Provider>;
});

export default AppsContext;
