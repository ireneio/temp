// improt
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

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
export default (): { loading: boolean } => {
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
    if (
      typeof router.query.userid === 'string' &&
      typeof router.query.from === 'string'
    )
      mutation({
        variables: {
          input: {
            userId: router.query.userid,
            service: router.query.from
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
