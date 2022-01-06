// typescript import
import { OptionsType } from './constants';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SendResetPswMailForm from './SendResetPswMailForm';
import { SIGNUP, LOGIN, FORGET_PSW } from './constants';

// graphql typescript
import { formFragment as formFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { signupFormFragment } from './gqls/signupForm';
import { sendResetPswMailFormFragment } from './gqls/sendResetPswMailForm';

// typescript definition
interface PropsType {
  options: OptionsType;
  store: formFragmentType | null;
  setOptions: (options: OptionsType) => void;
}

// definition
export default React.memo(({ options, store, setOptions }: PropsType) => {
  switch (options) {
    case LOGIN:
      return <LoginForm setOptions={setOptions} />;
    case SIGNUP:
      return (
        <SignupForm
          store={filter(signupFormFragment, store || null)}
          setOptions={setOptions}
        />
      );
    case FORGET_PSW:
      return (
        <SendResetPswMailForm
          store={filter(sendResetPswMailFormFragment, store || null)}
        />
      );
    default:
      return null;
  }
});
