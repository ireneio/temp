// typescript definition
interface UserType {
  additionalInfo?: {
    tel?: string;
    mobile?: string;
  };
}

// definition
export const resolvers = {
  User: {
    tel: ({ additionalInfo }: UserType) => additionalInfo?.tel || null,
    mobile: ({ additionalInfo }: UserType) => additionalInfo?.mobile || null,
  },
};
