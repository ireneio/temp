// import
import getLocale from './getLocale';

// definition
export default (
  id: string,
):
  | {
      __typename: string;
      id: string;
      name: ReturnType<typeof getLocale>;
      zipCodes: string[];
    }
  | undefined =>
  [
    {
      __typename: 'Area',
      id: '4d0e80e7-23da-43d5-856d-50dce23bff89',
      name: getLocale('仁愛區'),
      zipCodes: ['199', '200'],
    },
    {
      __typename: 'Area',
      id: '131bbd68-b641-4e68-b623-bc3040b24cc0',
      name: getLocale('信義區'),
      zipCodes: ['201'],
    },
    {
      __typename: 'Area',
      id: 'a2033e99-4f52-4468-b855-c8c8911d638f',
      name: getLocale('中正區'),
      zipCodes: ['100'],
    },
  ].find(({ id: areaId }) => areaId === id);
