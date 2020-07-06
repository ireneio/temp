// definition
export const resolvers = {
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
