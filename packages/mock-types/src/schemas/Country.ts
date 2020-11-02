// typescript import
import { ContextType, fieldsType } from '../mock';

// import
import mock from '../mock';

// graphql typescript
import { countryMockFragment } from './gqls/__generated__/countryMockFragment';

// definition
const countries: countryMockFragment[] = [
  {
    __typename: 'Country',
    id: 'a1e4aa6c-5a52-408a-9ede-471b10b1e265',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '臺灣',
    },
    cities: [
      {
        __typename: 'City',
        id: '804df1c0-b99d-482b-9014-1fa49dc9b428',
      },
      {
        __typename: 'City',
        id: '3b6cbd75-b341-4824-bbc7-37e5569cb07b',
      },
    ],
  },
  {
    __typename: 'Country',
    id: '6cd709bd-3d05-47a4-b86d-b54e64af0538',
    name: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '日本',
    },
    cities: [],
  },
];

const findCountry = (id: string): countryMockFragment =>
  countries.find(({ id: countryId }) => countryId === id) || countries[0];

export default mock.add<countryMockFragment>('Country', [
  ({ id }: { id: string }, _: unknown, { isList }: ContextType) =>
    !isList
      ? findCountry(id)
      : Object.keys(countries[0]).reduce(
          (result, key: keyof countryMockFragment) => ({
            ...result,
            [key]: ({ id: countryId }: { id: string }) =>
              findCountry(countryId)[key],
          }),
          {} as fieldsType<countryMockFragment, { id: string }>,
        ),
]);
