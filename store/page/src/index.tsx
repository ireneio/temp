// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import Page from '@meepshop/page';
import Group from '@store/group';

import usePage from './hooks/usePage';

// graphql import
import {
  pageUserFragment,
  pageOrderListFragment,
  pagePageFragment,
} from '@meepshop/page/gqls';
import { groupFragment } from '@store/group/gqls';

// definition
export default React.memo(() => {
  const data = usePage();
  const page = data?.viewer?.store?.page;

  if (!data || !page) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <Page
      viewer={filter(pageUserFragment, data?.viewer || null)}
      cart={filter(pageOrderListFragment, data?.getCartList || null)}
      page={filter(pagePageFragment, page)}
    >
      <Group page={filter(groupFragment, page)} />
    </Page>
  );
});
