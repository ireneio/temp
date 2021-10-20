// typescript import
import { Resolvers } from 'apollo-client/core/types';

import { loggerType } from '@meepshop/logger';

// import
import { parseRawContent } from '../utils/parseRawContent';

// definition
export const resolvers = (logger: loggerType): Resolvers => ({
  Query: {
    getDraftText: (_: unknown, { input }: { input: string | null }) =>
      parseRawContent(input, logger),
  },
});
