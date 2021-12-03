// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';

import useItems from './hooks/useItems';
import Item from './Item';

// graphql typescript
import { getViewerPermission as getViewerPermissionType } from '@meepshop/types/gqls/admin';

// graphql import
import { getViewerPermission } from './gqls';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const Setting: NextPage<PropsType> = React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting');
    const { loading, error, data } = useQuery<getViewerPermissionType>(
      getViewerPermission,
    );
    const isMerchant = data?.viewer?.role === 'MERCHANT';
    const storePermission = data?.viewer?.permission?.store;
    const items = useItems(isMerchant, storePermission || null);

    if (loading || error) return <Spin indicator={<LoadingOutlined spin />} />;

    return (
      <Header title={t('common:setting')}>
        {items.map(props => (
          <Item key={props.item} {...props} />
        ))}
      </Header>
    );
  },
);

Setting.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default Setting;
