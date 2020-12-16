// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Header from '@admin/header';

import useItems from './hooks/useItems';
import Item from './Item';

// graphql typescript
import { getViewerPermission } from './__generated__/getViewerPermission';

// graphql import
import {
  userUserFragment,
  userAuthorityListFragment,
} from '@admin/apollo/lib/User';

import { useItemspermissionStoreObjFragment } from './hooks/useItems';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const Setting: NextPage<PropsType> = React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting');
    const { loading, error, data } = useQuery<getViewerPermission>(
      gql`
        query getViewerPermission {
          viewer {
            id
            role
            permission @client {
              store {
                ...useItemspermissionStoreObjFragment
              }
            }
            ...userUserFragment
          }

          getAuthorityList {
            ...userAuthorityListFragment
          }
        }

        ${userUserFragment}
        ${userAuthorityListFragment}

        ${useItemspermissionStoreObjFragment}
      `,
    );
    const isMerchant = data?.viewer?.role === 'MERCHANT';
    const storePermission = data?.viewer?.permission?.store;
    const items = useItems(isMerchant, storePermission || null);

    if (loading || error)
      return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <Header title={t('title')}>
        {items.map(props => (
          <Item key={props.item} {...props} />
        ))}
      </Header>
    );
  },
);

Setting.getInitialProps = async () => ({
  namespacesRequired: ['setting'],
});

export default Setting;
