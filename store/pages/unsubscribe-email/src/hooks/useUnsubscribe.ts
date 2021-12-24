// improt
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  unsubscribeFromNotification as unsubscribeFromNotificationType,
  unsubscribeFromNotificationVariables,
  SubscriptionServiceEnum,
} from '@meepshop/types/gqls/store';

// graphql import
import { unsubscribeFromNotification } from '../gqls/useUnsubscribe';

// definition
export default (userId: string, type: string): { loading: boolean } => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [mutation] = useMutation<
    unsubscribeFromNotificationType,
    unsubscribeFromNotificationVariables
  >(unsubscribeFromNotification, {
    onCompleted: data => {
      if (!data.unsubscribeFromNotification?.success) router.replace('/');
      else setLoading(false);
    },
  });

  useEffect(() => {
    mutation({
      variables: {
        input: {
          userId,
          service: type
            .replace(/-/g, '_')
            .toUpperCase() as SubscriptionServiceEnum,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
  };
};
