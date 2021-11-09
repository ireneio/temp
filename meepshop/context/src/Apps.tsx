// import
import React, { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

// graphql typescript
import { getApps as getAppsType } from '@meepshop/types/gqls/meepshop';

// graphql import
import { getApps } from './gqls/apps';

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

export const AppsProvider = React.memo(({ children }) => {
  const { data } = useQuery<getAppsType>(getApps);
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

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return <AppsContext.Provider value={apps}>{children}</AppsContext.Provider>;
});

export default AppsContext;
