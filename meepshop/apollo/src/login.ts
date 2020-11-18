// typescript import
import { ContextType } from './index';

import { LoginInput } from '../../../__generated__/admin';

// definition
export const resolvers = {
  Mutation: {
    login: async (
      _: unknown,
      {
        input: { email, password, gRecaptchaResponse, cname },
      }: { input: LoginInput },
      { client }: ContextType,
    ) => {
      const res = await fetch('/api/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          email,
          password,
          'g-recaptcha-response': gRecaptchaResponse,
          ...(!cname
            ? {}
            : {
                type: 'helper',
                cname,
              }),
        }),
      });
      const defaultResponse = {
        __typename: 'LoginResponse',
        status: 'FAIL',
        message: null,
        role: null,
        adminStatus: null,
      };

      if (res.status !== 200)
        return {
          ...defaultResponse,
          message: `${res.status} ${res.statusText}`,
        };

      const data = await res.json();
      const { type, adminStatus, error } = data;

      if (error)
        return error === 'Invalid recaptcha response'
          ? {
              ...defaultResponse,
              status: 'INVALID_RECAPTCHA_RESPONSE',
            }
          : {
              ...defaultResponse,
              message: error,
            };

      await client.resetStore();

      return {
        ...defaultResponse,
        status: 'OK',
        role: type.toUpperCase(),
        adminStatus,
      };
    },
  },
};
