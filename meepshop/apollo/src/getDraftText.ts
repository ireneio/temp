// import
import { parseRawContent } from './utils/parseRawContent';

// definition
export const resolvers = {
  Query: {
    getDraftText: (_: unknown, { input }: { input: string | null }) =>
      parseRawContent(input),
  },
};
