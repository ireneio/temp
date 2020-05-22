// typescript import
import { NextPage } from 'next';

// import
import React, { useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon } from 'antd';

import SettingHeader from '@admin/setting-header';
import { useTranslation } from '@admin/utils/lib/i18n';

import useItems from './hooks/useItems';
import Item from './Item';
import styles from './styles/index.less';

// graphql typescript
import { getViewerPermission } from './__generated__/getViewerPermission';

// graphql import
import {
  viewerUserFragment,
  viewerAuthorityListFragment,
} from '@admin/apollo-client-resolvers/lib/viewer';

import { useItemspermissionStoreObjFragment } from './hooks/useItems';

// definition
const Setting: NextPage = React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('setting');
    const rootRef = useRef(null);
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
      <div className={styles.root} ref={rootRef}>
        <SettingHeader target={() => rootRef.current}>
          <div className={styles.header}>
            <h1>{t('title')}</h1>
          </div>
        </SettingHeader>
        <div className={styles.content}>
          {items.map(props => (
            <Item key={props.item} {...props} />
          ))}
        </div>
      </div>
    );
  },
);

Setting.getInitialProps = async () => ({
  namespacesRequired: ['setting'],
});

export default Setting;
