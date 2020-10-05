import postGraphql from 'utils/postGraphql';

export default context =>
  postGraphql({
    ...context,
    query: `
      defaultStoreProduct
    `,
    variables: {
      type: 'query getDefaultStoreProduct',
    },
  });
