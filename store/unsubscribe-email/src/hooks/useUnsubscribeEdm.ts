// improt
import { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  unsubscribeEdm as unsubscribeEdmType,
  unsubscribeEdmVariables,
} from '@meepshop/types/gqls/store';

// definition
const mutation = gql`
  mutation unsubscribeEdm($userId: ID!) {
    unsubscribeEdm(userId: $userId) {
      success
    }
  }
`;

export default (): { loading: boolean } => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [unsubscribeEdm] = useMutation<
    unsubscribeEdmType,
    unsubscribeEdmVariables
  >(mutation, {
    onCompleted: data => {
      if (!data.unsubscribeEdm?.success) router.replace('/');
      else setLoading(false);
    },
  });

  useEffect(() => {
    unsubscribeEdm({ variables: { userId: router.query.userId as string } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
  };
};
