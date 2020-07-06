// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import SettingWrapper from '@admin/setting-wrapper';

import useItems from './hooks/useItems';
import Item from './Item';

// graphql typescript
import { getViewerPermission } from './__generated__/getViewerPermission';

// graphql import
import {
  viewerUserFragment,
  viewerAuthorityListFragment,
} from '@admin/apollo/lib/viewer';

import { useItemspermissionStoreObjFragment } from './hooks/useItems';

// definition
const Setting: NextPage = React.memo(
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
            ...viewerUserFragment
          }

          getAuthorityList {
            ...viewerAuthorityListFragment
          }
        }

        ${viewerUserFragment}
        ${viewerAuthorityListFragment}

        ${useItemspermissionStoreObjFragment}
      `,
    );
    const isMerchant = data?.viewer?.role === 'MERCHANT';
    const storePermission = data?.viewer?.permission?.store;
    const items = useItems(isMerchant, storePermission || null);

    if (loading || error)
      return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <SettingWrapper title={t('title')}>
        {items.map(props => (
          <Item key={props.item} {...props} />
        ))}
      </SettingWrapper>
    );
  },
);

Setting.getInitialProps = async () => ({
  namespacesRequired: ['setting'],
});

export default Setting;
