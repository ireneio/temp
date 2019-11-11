// definition
// FIXME: should remove this files after lockedCountry return the id
export const resolver = {
  SettingObjectType: {
    lockedCountry: ({ lockedCountry }: { lockedCountry: string[] | null }) =>
      (lockedCountry || []).map(() => 'a1e4aa6c-5a52-408a-9ede-471b10b1e265'),
  },
};
