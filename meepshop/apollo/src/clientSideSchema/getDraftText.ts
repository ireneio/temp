// typescript import
import { Resolvers } from '@apollo/client';

import { loggerType } from '@meepshop/logger';

// import
import { parseRawContent } from '../utils/parseRawContent';

// definition
export const resolvers = (logger: loggerType): Resolvers => ({
  Query: {
    getDraftText: (_: unknown, { input }: { input: string | null }) => {
      try {
        return parseRawContent(input);
      } catch (error) {
        // FIXME: remove after all draft-js is formatted
        logger.error({
          name: 'FORMAT_DRAFT_ERROR',
          input,
          error,
        });

        return null;
      }
    },
  },
});
