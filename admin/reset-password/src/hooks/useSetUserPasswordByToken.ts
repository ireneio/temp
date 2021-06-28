// import
import { useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  isResetPasswordTokenValid as isResetPasswordTokenValidType,
  isResetPasswordTokenValidVariables as isResetPasswordTokenValidVariablesType,
  setUserPasswordByToken as setUserPasswordByTokenType,
  setUserPasswordByTokenVariables as setUserPasswordByTokenVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  isResetPasswordTokenValid,
  setUserPasswordByToken,
} from '../gqls/useSetUserPasswordByToken';

// typescript definition
export interface ValuesType {
  password: string;
  confirmPassword: string;
}

// definition
export default (): {
  loading: boolean;
  response?: string;
  setUserPasswordByToken: (values: ValuesType) => void;
} => {
  const [response, setResponse] = useState<string | undefined>();
  const router = useRouter();
  const token = router.query.token as string;
  const [mutation, { loading }] = useMutation<
    setUserPasswordByTokenType,
    setUserPasswordByTokenVariablesType
  >(setUserPasswordByToken, {
    onCompleted: data => {
      setResponse(data?.setUserPasswordByToken.status);
    },
  });

  useQuery<
    isResetPasswordTokenValidType,
    isResetPasswordTokenValidVariablesType
  >(isResetPasswordTokenValid, {
    variables: { token },
    onCompleted: data => {
      if (!data.isResetPasswordTokenValid) setResponse('FAIL_TOKEN_TIMEOUT');
    },
  });

  return {
    loading,
    response,
    setUserPasswordByToken: useCallback(
      ({ confirmPassword: _, ...input }) => {
        mutation({
          variables: {
            input: {
              ...input,
              token,
            },
          },
        });
      },
      [token, mutation],
    ),
  };
};
