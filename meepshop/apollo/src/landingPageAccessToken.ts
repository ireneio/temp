// definition
export const resolvers = {
  Mutation: {
    landingPageAccessToken: async (
      _: unknown,
      // TODO: should use graphql type
      { input: { email } }: { input: { email: string } },
    ) => {
      const res = await fetch('/auth/landing_page/access_token', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ email }),
      });
      const defaultResponse = {
        __typename: 'LandingPageAccessTokenResponse',
        status: 'FAIL',
        message: null,
      };

      if (res.status !== 200)
        return {
          ...defaultResponse,
          message: `${res.status} ${res.statusText}`,
        };

      return {
        ...defaultResponse,
        status: 'OK',
      };
    },
  },
};
