// import
import getCity from './getCity';
import getLocale from './getLocale';

// definition
export default (
  id: string,
):
  | {
      __typename: string;
      id: string;
      name: ReturnType<typeof getLocale>;
      cities: ReturnType<typeof getCity>[];
    }
  | undefined =>
  [
    {
      __typename: 'Country',
      id: 'a1e4aa6c-5a52-408a-9ede-471b10b1e265',
      name: getLocale('臺灣'),
      cities: [
        getCity('804df1c0-b99d-482b-9014-1fa49dc9b428'),
        getCity('3b6cbd75-b341-4824-bbc7-37e5569cb07b'),
      ],
    },
    {
      __typename: 'Country',
      id: '6cd709bd-3d05-47a4-b86d-b54e64af0538',
      name: getLocale('日本'),
      cities: [],
    },
  ].find(({ id: countryId }) => countryId === id);
