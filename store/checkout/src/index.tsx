// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon } from 'antd';

import useCreateOrder from './hooks/useCreateOrder';
import useUpdateUser from './hooks/useUpdateUser';

// graphql typescript
import {
  getCheckoutInfo as getCheckoutInfoType,
  getCheckoutInfo_viewer as getCheckoutInfoViewer,
  getCheckoutInfo_viewer_additionalInfo as getCheckoutInfoViewerAdditionalInfo,
  getCheckoutInfo_viewer_shippableRecipientAddresses as getCheckoutInfoViewerShippableRecipientAddresses,
  getCheckoutInfo_viewer_store_setting_checkoutFields as getCheckoutInfoViewerStoreSettingCheckoutFields,
} from '@meepshop/types/gqls/store';

// graphql import
import { getCheckoutInfo } from './gqls';

// typescript definition
interface PropsType {
  children: (
    data: Pick<getCheckoutInfoViewer, 'name' | 'address'> & {
      mobile: getCheckoutInfoViewerAdditionalInfo['mobile'];
      shippableRecipientAddresses: getCheckoutInfoViewerShippableRecipientAddresses[];
      checkoutFields: getCheckoutInfoViewerStoreSettingCheckoutFields | null;
      createOrder: ReturnType<typeof useCreateOrder>;
      updateUser: ReturnType<typeof useUpdateUser>;
    },
  ) => React.ReactElement;
}

// definition
export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<getCheckoutInfoType>(getCheckoutInfo);
  const viewer = data?.viewer || null;
  const createOrder = useCreateOrder();
  const updateUser = useUpdateUser(viewer);

  if (!viewer) return <Spin indicator={<Icon type="loading" spin />} />;

  return children({
    name: viewer.name,
    mobile: viewer.additionalInfo?.mobile || null,
    address: viewer.address,
    shippableRecipientAddresses: viewer.shippableRecipientAddresses,
    checkoutFields: viewer.store?.setting?.checkoutFields || null,
    createOrder,
    updateUser,
  });
});
