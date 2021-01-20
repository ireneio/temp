// import
import { useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  isResetPasswordTokenValid,
  setUserPasswordByToken as setUserPasswordByTokenType,
  setUserPasswordByTokenVariables as setUserPasswordByTokenVariablesType,
} from '@meepshop/types/gqls/admin';

// definition
export default (): {
  loading: boolean;
  response?: string;
  setUserPasswordByToken: (input: setUserPasswordByTokenVariablesType) => void;
} => {
  const [response, setResponse] = useState<string | undefined>();
  const router = useRouter();

  useQuery<isResetPasswordTokenValid>(
    gql`
      query isResetPasswordTokenValid($token: String!) {
        isResetPasswordTokenValid(token: $token)
      }
    `,
    {
      variables: { token: router.query.token },
      onCompleted: data => {
        if (!data.isResetPasswordTokenValid) setResponse('FAIL_TOKEN_TIMEOUT');
      },
    },
  );

  const [setUserPasswordByToken, { loading }] = useMutation<
    setUserPasswordByTokenType
  >(
    gql`
      mutation setUserPasswordByToken($input: SetUserPasswordByTokenInput!) {
        setUserPasswordByToken(input: $input) {
          status
        }
      }
    `,
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
        setUserPasswordByToken({
          variables: input,
        });
      },
      [setUserPasswordByToken],
    ),
  };
};
