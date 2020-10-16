// import
import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Table } from 'antd';

import { Colors as ColorsContext } from '@meepshop/context';

import Form from './Form';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import { getUserRecipients as getUserRecipientsType } from './gqls/__generated__/getUserRecipients';
import { useColumnsRecipientAddressFragment as useColumnsRecipientAddressFragmentType } from './gqls/__generated__/useColumnsRecipientAddressFragment';

// graphql import
import getUserRecipients from './gqls';
import { formStoreFragment, formRecipientAddressFragment } from './gqls/form';
import useColumnsRecipientAddressFragment from './gqls/useColumns';

// definition
export default React.memo(() => {
  const colors = useContext(ColorsContext);
  const { data } = useQuery<getUserRecipientsType>(getUserRecipients);
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
