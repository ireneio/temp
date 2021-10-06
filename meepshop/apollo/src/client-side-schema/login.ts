// typescript import
import { ContextType } from '../types';

// import
import { fetchWithRetries } from 'fbjs';

// graphql typescript
import { LoginInput } from '@meepshop/types/gqls/meepshop';

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
      const res = await fetchWithRetries('/api/auth/login', {
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
      }).catch(e => ({ status: 500, statusText: e.message, json: () => null }));
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

      if (type === 'merchant_applicant') {
        return {
          ...defaultResponse,
          status: 'MERCHANT_APPLICANT',
        };
      }

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
