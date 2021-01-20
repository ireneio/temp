// typescript import
import { Dispatch, SetStateAction } from 'react';
import { QueryTuple } from '@apollo/react-hooks';

// import
import { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

// graphql import
import { useCheckUser } from '../gqls/useCheckUser';

// graphql typescript
import {
  useCheckUser as useCheckUserType,
  useCheckUserVariables,
} from '@meepshop/types/gqls/meepshop';

// definition
export default (): {
  showLogin: boolean;
  setShowLogin: Dispatch<SetStateAction<boolean>>;
  checkUser: QueryTuple<useCheckUserType, useCheckUserVariables>[0];
} => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [checkUser] = useLazyQuery<useCheckUserType, useCheckUserVariables>(
    useCheckUser,
    {
      onCompleted: ({ checkUserInfo }) => {
        if (checkUserInfo?.exists) setShowLogin(true);
      },
    },
  );

  return {
    showLogin,
    setShowLogin,
    checkUser,
  };
};
