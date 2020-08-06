import postGraphql from 'utils/postGraphql';

export default context =>
  postGraphql({
    ...context,
    query: `
      defaultStoreProducts (filter: SHIRT)
    `,
    variables: {
      type: 'query getDefaultStoreProducts',
    },
  });
