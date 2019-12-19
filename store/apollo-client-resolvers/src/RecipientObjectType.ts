// typescript definition
interface RecipientObjectType {
  address?: {
    postalCode?: string;
    yahooCode?: {
      country?: string;
      city?: string;
      county?: string;
      street?: string;
    };
  };
}

// definition
export const resolver = {
  RecipientObjectType: {
    postalCode: ({ address }: RecipientObjectType) =>
      address?.postalCode || null,
    country: ({ address }: RecipientObjectType) =>
      address?.yahooCode?.country || null,
    city: ({ address }: RecipientObjectType) =>
      address?.yahooCode?.city || null,
    county: ({ address }: RecipientObjectType) =>
      address?.yahooCode?.county || null,
    street: ({ address }: RecipientObjectType) =>
      address?.yahooCode?.street || null,
  },
};
