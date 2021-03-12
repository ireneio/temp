// typescript import
import { ValidationRule } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { isFullWidth, isEmail } from 'validator';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  checkEmail as checkEmailType,
  checkEmailVariables,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { checkEmail } from './gqls/useValidateEmail';

// definition
export default (
  emailExist?: (message: string) => string | void,
): {
  normalize: (value: string) => string;
  validator: ValidationRule['validator'];
} => {
  const { t } = useTranslation('validator');
  const client = useApolloClient();

  return {
    normalize: value => value?.replace(/\s/g, ''),
    validator: useCallback(
      async (_, value, callback) => {
        if (value && (isFullWidth(value) || !isEmail(value)))
          return callback(t('email.invalid-format'));

        if (/@.*[A-Z]+.*$/.test(value))
          return callback(t('email.use-lowercase-letters'));

        if (!emailExist) return callback();

        const { data } = await client.query<
          checkEmailType,
          checkEmailVariables
        >({
          query: checkEmail,
          variables: {
            search: {
              filter: {
                and: [
                  {
                    type: 'exact',
                    field: 'email',
                    query: value,
                  },
                  {
                    type: 'exact',
                    field: 'type',
                    query: 'shopper',
                  },
                ],
              },
            },
          },
          fetchPolicy: 'network-only',
        });

        if (data?.checkUserInfo?.exists)
          return callback(emailExist(t('email.already-exists')));

        return callback();
      },
      [emailExist, t, client],
    ),
  };
};
