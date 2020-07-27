import postGraphql from 'utils/postGraphql';

export default async locale => {
  const variables = {
    keys: '$input: UpdateShopperLanguagePreferenceInput!',
    type: 'mutation updateShopperLanguagePreference',
    values: {
      input: {
        locale,
      },
    },
  };

  const query = `
    updateShopperLanguagePreference(input: $input) {
      status
    }
  `;

  const response = await postGraphql({
    query,
    variables,
  });

  return response;
};
