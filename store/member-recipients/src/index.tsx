// import
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Table } from 'antd';

import { Colors as ColorsContext } from '@meepshop/context';

import Form from './Form';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import { getUserRecipients } from './__generated__/getUserRecipients';
import { useColumnsRecipientAddressFragment as useColumnsRecipientAddressFragmentType } from './hooks/__generated__/useColumnsRecipientAddressFragment';

import { formRecipientAddressFragment, formStoreFragment } from './Form';
import { useColumnsRecipientAddressFragment } from './hooks/useColumns';

// definition
const query = gql`
  query getUserRecipients {
    viewer {
      id
      shippableRecipientAddresses {
        ...formRecipientAddressFragment
        ...useColumnsRecipientAddressFragment
      }

      store {
        ...formStoreFragment
      }
    }
  }

  ${formRecipientAddressFragment}
  ${useColumnsRecipientAddressFragment}
  ${formStoreFragment}
`;

export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const { data } = useQuery<getUserRecipients>(query);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const columns = useColumns(setSelectedId);
  const viewer = data?.viewer;

  if (!viewer) return <Spin indicator={<Icon type="loading" spin />} />;

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

      <Table<useColumnsRecipientAddressFragmentType>
        rowKey={({ id }) => id}
        columns={columns}
        dataSource={filter(
          useColumnsRecipientAddressFragment,
          shippableRecipientAddresses,
        )}
        pagination={false}
      />

      <Form
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
