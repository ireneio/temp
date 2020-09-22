// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';

import useCreateOrder from './hooks/useCreateOrder';
import useUpdateUser from './hooks/useUpdateUser';

// graphql typescript
import {
  getCheckoutInfo,
  getCheckoutInfo_viewer as getCheckoutInfoViewer,
  getCheckoutInfo_viewer_additionalInfo as getCheckoutInfoViewerAdditionalInfo,
  getCheckoutInfo_viewer_shippableRecipientAddresses as getCheckoutInfoViewerShippableRecipientAddresses,
} from './__generated__/getCheckoutInfo';

// typescript definition
interface PropsType {
  children: (
    data: Pick<getCheckoutInfoViewer, 'name' | 'address'> & {
      mobile: getCheckoutInfoViewerAdditionalInfo['mobile'];
      shippableRecipientAddresses: getCheckoutInfoViewerShippableRecipientAddresses[];
      createOrder: ReturnType<typeof useCreateOrder>;
      updateUser: ReturnType<typeof useUpdateUser>;
    },
  ) => React.ReactElement;
}

// definition
const query = gql`
  query getCheckoutInfo {
    viewer {
      id
      name
      additionalInfo {
        mobile
      }
      address {
        country {
          id
        }
        city {
          id
        }
        area {
          id
        }
        street
        zipCode
      }
      shippableRecipientAddresses {
        id
        name
        mobile
        country {
          id
        }
        city {
          id
        }
        area {
          id
        }
        street
        zipCode
      }
    }
  }
`;

export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<getCheckoutInfo>(query);
  const createOrder = useCreateOrder();
  const updateUser = useUpdateUser();
  const viewer = data?.viewer;

  if (!viewer) return <Spin indicator={<Icon type="loading" spin />} />;

  return children({
    name: viewer.name,
    mobile: viewer.additionalInfo?.mobile || null,
    address: viewer.address,
    shippableRecipientAddresses: viewer.shippableRecipientAddresses,
    createOrder,
    updateUser,
  });
});
