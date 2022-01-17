// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';

import Form from './Form';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import {
  formStoreFragment as formStoreFragmentType,
  getUserRecipients as getUserRecipientsType,
  formRecipientAddressFragment as formRecipientAddressFragmentType,
  useColumnsRecipientAddressFragment as useColumnsRecipientAddressFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getUserRecipients } from './gqls';
import { formStoreFragment, formRecipientAddressFragment } from './gqls/form';
import { useColumnsRecipientAddressFragment } from './gqls/useColumns';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const { data } = useQuery<getUserRecipientsType>(getUserRecipients);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const columns = useColumns(setSelectedId);
  const viewer = data?.viewer;

  if (!viewer) return <Spin indicator={<LoadingOutlined spin />} />;

  const { shippableRecipientAddresses, store } = viewer;
  const recipientAddress =
    shippableRecipientAddresses.find(({ id }) => id === selectedId) || null;

  return (
    <div className={styles.root}>
      <Table<useColumnsRecipientAddressFragmentType>
        columns={columns}
        dataSource={filter<useColumnsRecipientAddressFragmentType[]>(
          useColumnsRecipientAddressFragment,
          shippableRecipientAddresses,
        )}
        pagination={false}
        rowKey="id"
      />

      <Form
        recipientAddress={filter<formRecipientAddressFragmentType>(
          formRecipientAddressFragment,
          recipientAddress,
        )}
        store={filter<formStoreFragmentType>(formStoreFragment, store)}
        cancel={() => setSelectedId(null)}
      />
    </div>
  );
});
