// definition
export default async (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    res.redirect(`${state}?lineLoginError=${error}`);
    return;
  }

  const lineRes = await fetch(`${process.env.MEEPSHOP_API}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-meepshop-domain': req.headers.host || '',
    },
    body: JSON.stringify({
      query: `
          mutation lineLoginProcess($input: LineLoginProcessInput!) {
            lineLoginProcess(input: $input){
              ... on LoginSuccessResponse {
                __typename
                authorizationToken
              }
              ... on RequestNotFromStoreError {
                __typename
                message
              }
              ... on StoreNotFoundError {
                __typename
                message
              }
              ... on IssueAccessTokenFailedError {
                __typename
                message
              }
              ... on AccessTokenVerificationFailedError {
                __typename
                message
              }
              ... on IncorrectClientIdError {
                __typename
                message
              }
              ... on TokenExpireInNotPositiveValueError {
                __typename
                message
              }
              ... on IdTokenVerificationFailedError {
                __typename
                message
              }
              ... on MissingEmailError {
                __typename
                message
              }
              ... on CreateUserFailedError {
                __typename
                message
              }
              ... on CreateTokenFailedError {
                __typename
                message
              }
              ... on UnhandledError {
                __typename
                message
              }
            }
          }
        `,
      variables: {
        input: {
          code: code.toString(),
          redirectUri: `https://${req.headers.host}/api/auth/line-login`,
        },
      },
    }),
  }).then(response => response.json());

  if (lineRes.data.lineLoginProcess.__typename !== 'LoginSuccessResponse') {
    res.redirect(
      `${state}?lineLoginError=${lineRes.data.lineLoginProcess.message}`,
    );
    return;
  }

  res.cookie(
    'x-meepshop-authorization-token',
    lineRes.data.lineLoginProcess.authorizationToken,
    {
      maxAge: 86400 * 1000 * 7,
      httpOnly: true,
    },
  );

  res.redirect(state);
};
