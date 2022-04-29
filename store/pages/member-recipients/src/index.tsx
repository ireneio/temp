// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';

import filter from '@meepshop/utils/lib/filter';

import Form from './Form';
import useRecipientColumns from './hooks/useRecipientColumns';
import styles from './styles/index.less';

// graphql typescript
import {
  getUserRecipients as getUserRecipientsType,
  useRecipientColumnsRecipientAddressFragment as useRecipientColumnsRecipientAddressFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getUserRecipients } from './gqls';
import { formUserFragment, formRecipientAddressFragment } from './gqls/form';
import {
  useRecipientColumnsUserFragment,
  useRecipientColumnsRecipientAddressFragment,
} from './gqls/useRecipientColumns';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const { data } = useQuery<getUserRecipientsType>(getUserRecipients);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const columns = useRecipientColumns(
    filter(useRecipientColumnsUserFragment, data?.viewer || null),
    setSelectedId,
  );
  const viewer = data?.viewer;

  if (!viewer) return <Spin indicator={<LoadingOutlined spin />} />;

  const { shippableRecipientAddresses } = viewer;
  const recipientAddress =
    shippableRecipientAddresses.find(({ id }) => id === selectedId) || null;

  return (
    <div className={styles.root}>
      <Table<useRecipientColumnsRecipientAddressFragmentType>
        columns={columns}
        dataSource={filter(
          useRecipientColumnsRecipientAddressFragment,
          shippableRecipientAddresses,
        )}
        pagination={false}
        rowKey="id"
      />

      <Form
        viewer={filter(formUserFragment, viewer)}
        recipientAddress={filter(
          formRecipientAddressFragment,
          recipientAddress,
        )}
        cancel={() => setSelectedId(null)}
      />
    </div>
  );
});
