// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React, { useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

// graphql typescript
import { applyForStore as applyForStoreType } from '@meepshop/types/gqls/admin';

// definition
export default ({
  validateFields,
}: FormComponentProps['form']): {
  loading: boolean;
  isApplyForStoreCompleted: boolean;
  applyForStore: (e: React.MouseEvent<HTMLButtonElement>) => void;
} => {
  const [isApplyForStoreCompleted, setIsApplyForStoreCompleted] = useState(
    false,
  );

  const [applyForStore, { loading }] = useMutation<applyForStoreType>(
    gql`
      mutation applyForStore($input: ApplyForStoreInput!) {
        applyForStore(input: $input) {
          status
        }
      }
    `,
    {
      onCompleted: ({ applyForStore: { status } }) => {
        if (status === 'SUCCESS') setIsApplyForStoreCompleted(true);
        else message.error(status);
      },
    },
  );

  return {
    loading,
    isApplyForStoreCompleted,
    applyForStore: useCallback(
      e => {
        e.preventDefault();

        validateFields((errors, { email, password }) => {
          if (!errors) {
            applyForStore({ variables: { input: { email, password } } });
          }
        });
      },
      [validateFields, applyForStore],
    ),
  };
};
