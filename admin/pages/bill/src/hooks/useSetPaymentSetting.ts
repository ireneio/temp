// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  setPaymentSetting as setPaymentSettingType,
  setPaymentSettingVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { setPaymentSetting } from '../gqls/useSetPaymentSetting';

// definition
export default (): ((input: setPaymentSettingVariables['input']) => void) => {
  const [mutation] = useMutation<
    setPaymentSettingType,
    setPaymentSettingVariables
  >(setPaymentSetting);

  return useCallback(
    (input: setPaymentSettingVariables['input']) => {
      mutation({
        variables: {
          input,
        },
      });
    },
    [mutation],
  );
};
