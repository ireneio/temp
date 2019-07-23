// import
import idx from 'idx';

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
  Query: {},
  RecipientObjectType: {
    postalCode: ({ address }: RecipientObjectType) =>
      idx(address, _ => _.postalCode) || null,
    country: ({ address }: RecipientObjectType) =>
      idx(address, _ => _.yahooCode.country) || null,
    city: ({ address }: RecipientObjectType) =>
      idx(address, _ => _.yahooCode.city) || null,
    county: ({ address }: RecipientObjectType) =>
      idx(address, _ => _.yahooCode.county) || null,
    street: ({ address }: RecipientObjectType) =>
      idx(address, _ => _.yahooCode.street) || null,
  },
};
