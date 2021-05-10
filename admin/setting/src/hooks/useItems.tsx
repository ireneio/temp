// typescript import
import { IconProps } from 'antd/lib/icon';

// import
import React, { useMemo } from 'react';
import { Icon } from 'antd';

import {
  ShopOutlineIcon,
  ShoppingOutlineIcon,
  PaymentsOutlineIcon,
  ShippingOutlineIcon,
  ExportOutlineIcon,
  AuthorizationOutlineIcon,
  ThirdPartyOutlineIcon,
  NotificationOutlineIcon,
  AppStoreOutlineIcon,
} from '@meepshop/icons';

// graphql typescript
import { useItemsFragment as useItemsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface ItemType {
  item: string;
  path: string;
  Icon: React.MemoExoticComponent<(props: IconProps) => React.ReactElement>;
  auth: boolean;
}

// definition
export default (
  isMerchant: boolean,
  storePermission: useItemsFragmentType | null,
): ItemType[] =>
  useMemo(
    () =>
      [
        {
          item: 'store',
          path: '/setting/store',
          Icon: ShopOutlineIcon,
          auth: isMerchant || Boolean(storePermission?.index),
        },
        {
          item: 'shopping',
          path: '/setting/shopping',
          Icon: ShoppingOutlineIcon,
          auth: isMerchant || Boolean(storePermission?.index),
        },
        {
          item: 'payment',
          path: '/payments',
          Icon: PaymentsOutlineIcon,
          auth:
            isMerchant ||
            Boolean(storePermission?.index && storePermission?.payment),
        },
        {
          item: 'shipment',
          path: '/shippings',
          Icon: ShippingOutlineIcon,
          auth:
            isMerchant ||
            Boolean(storePermission?.index && storePermission?.shipment),
        },
        {
          item: 'export',
          path: '/export-setting',
          Icon: ExportOutlineIcon,
          auth:
            isMerchant ||
            Boolean(storePermission?.index && storePermission?.exportSetting),
        },
        {
          item: 'authorization',
          path: '/authorization',
          Icon: AuthorizationOutlineIcon,
          auth: isMerchant,
        },
        {
          item: 'third-party',
          path: '/setting/third-party',
          Icon: ThirdPartyOutlineIcon,
          auth: isMerchant || Boolean(storePermission?.index),
        },
        {
          item: 'notification',
          path: '/setting/notification',
          Icon: NotificationOutlineIcon,
          auth:
            isMerchant ||
            Boolean(
              storePermission?.index &&
                storePermission?.ableToEditNotificationSetting,
            ),
        },
        {
          item: 'redirects',
          path: '/setting/redirects',
          Icon: React.memo(() => <Icon type="cluster" />),
          auth: isMerchant,
        },
        {
          item: 'app',
          path: '/app-store',
          Icon: AppStoreOutlineIcon,
          auth: isMerchant || Boolean(storePermission?.index),
        },
      ].filter(({ auth }) => auth),
    [isMerchant, storePermission],
  );
