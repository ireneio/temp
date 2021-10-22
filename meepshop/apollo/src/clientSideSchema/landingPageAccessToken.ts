// definition
export const resolvers = {
  Mutation: {
    landingPageAccessToken: async (
      _: unknown,
      // TODO: should use graphql type
      { input: { email } }: { input: { email: string } },
    ) => {
      const res = await fetch('/api/landing-page/access-token', {
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
        userId: null,
        message: null,
      };

      if (res.status !== 200)
        return {
          ...defaultResponse,
          message: `${res.status} ${res.statusText}`,
        };

      const { userId } = await res.json();

      return {
        ...defaultResponse,
        status: 'OK',
        userId,
      };
    },
  },
};
