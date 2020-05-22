// definition
export const resolver = {
  Query: {
    validatedConvenienceStoreCities: ({
      validatedConvenienceStoreCities,
    }: {
      validatedConvenienceStoreCities: {
        id: string;
        name: { zh_TW: string };
      }[];
    }) =>
      validatedConvenienceStoreCities.map(city => ({ ...city, cvsAreas: [] })),
  },
};
