import postGraphql from 'utils/postGraphql';

export default async function(user) {
  const variables = {
    keys: '$input: UpdateShopperInfoInput!',
    type: 'mutation updateShopperInformation',
    values: {
      input: user,
    },
  };

  const query = `
    updateShopperInformation(input: $input) {
      status
    }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  return response;
}
