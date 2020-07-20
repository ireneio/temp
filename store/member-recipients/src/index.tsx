// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Table } from 'antd';

import Form from './Form';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import { getUserRecipients } from './__generated__/getUserRecipients';
import { useColumnsFragment as useColumnsFragmentType } from './hooks/__generated__/useColumnsFragment';

// graphql import
import { colorListFragment } from '@meepshop/apollo/lib/ColorList';

import { formRecipientAddressFragment, formStoreFragment } from './Form';
import { useColumnsFragment } from './hooks/useColumns';

// definition
const query = gql`
  query getUserRecipients {
    viewer {
      id
      shippableRecipientAddresses {
        ...formRecipientAddressFragment
        ...useColumnsFragment
      }

      store {
        ...formStoreFragment
      }
    }

    getColorList {
      ...colorListFragment
    }
  }

  ${formRecipientAddressFragment}
  ${useColumnsFragment}
  ${formStoreFragment}
  ${colorListFragment}
`;

export default React.memo(() => {
  const { data } = useQuery<getUserRecipients>(query);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const columns = useColumns(setSelectedId);
  const colors = data?.getColorList?.colors;
  const viewer = data?.viewer;

  if (!viewer || !colors)
    return <Spin indicator={<Icon type="loading" spin />} />;

  const { shippableRecipientAddresses, store } = viewer;
  const recipientAddress = shippableRecipientAddresses.find(
    ({ id }) => id === selectedId,
  );

  return (
    <div className={styles.root}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.root} .ant-table-tbody > tr:hover > td {
              background: ${colors[4]};
            }
          `,
        }}
      />

      <Table<useColumnsFragmentType>
        rowKey={({ id }) => id}
        columns={columns}
        dataSource={filter(useColumnsFragment, shippableRecipientAddresses)}
        pagination={false}
      />

      <Form
        colors={colors}
        recipientAddress={
          !recipientAddress
            ? null
            : filter(formRecipientAddressFragment, recipientAddress)
        }
        store={!store ? null : filter(formStoreFragment, store)}
        cancel={() => setSelectedId(null)}
      />
    </div>
  );
});
