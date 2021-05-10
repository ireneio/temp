// import
import { useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  isResetPasswordTokenValid as isResetPasswordTokenValidType,
  setUserPasswordByToken as setUserPasswordByTokenType,
  setUserPasswordByTokenVariables as setUserPasswordByTokenVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  isResetPasswordTokenValid,
  setUserPasswordByToken,
} from '../gqls/useSetUserPasswordByToken';

// definition
export default (): {
  loading: boolean;
  response?: string;
  setUserPasswordByToken: (input: setUserPasswordByTokenVariablesType) => void;
} => {
  const [response, setResponse] = useState<string | undefined>();
  const router = useRouter();

  useQuery<isResetPasswordTokenValidType>(isResetPasswordTokenValid, {
    variables: { token: router.query.token },
    onCompleted: data => {
      if (!data.isResetPasswordTokenValid) setResponse('FAIL_TOKEN_TIMEOUT');
    },
  });

  const [mutation, { loading }] = useMutation<setUserPasswordByTokenType>(
    setUserPasswordByToken,
    {
      onCompleted: data => {
        setResponse(data?.setUserPasswordByToken.status);
      },
    },
  );

  return {
    loading,
    response,
    setUserPasswordByToken: useCallback(
      (input: setUserPasswordByTokenVariablesType) => {
        mutation({
          variables: input,
        });
      },
      [mutation],
    ),
  };
};
