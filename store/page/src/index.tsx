// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';

import Page from '@meepshop/page';
import Group from '@store/group';

import usePage from './hooks/usePage';

// graphql import
import { pageFragment } from '@meepshop/page/lib/gqls';
import { groupFragment } from '@store/group/lib/gqls';

// definition
export default React.memo(() => {
  const data = usePage();

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <Page
      storeExperiment={filter(
        pageFragment,
        data?.viewer?.store?.experiment || null,
      )}
    >
      <Group page={filter(groupFragment, data?.viewer?.store?.page || null)} />
    </Page>
  );
});
