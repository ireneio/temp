// typescript import
import { Resolvers } from '@apollo/client';

import { loggerType } from '@meepshop/logger';

// import
import { parseRawContent } from '../utils/parseRawContent';

// graphql typescript
import { SettingObjectTypeFragment as SettingObjectTypeFragmentType } from '@meepshop/types/gqls/meepshop';

// definition
export const resolvers = (logger: loggerType): Resolvers => ({
  SettingObjectType: {
    shopperLoginMessageDraft: ({
      shopperLoginMessage,
    }: SettingObjectTypeFragmentType) => {
      try {
        return parseRawContent(shopperLoginMessage);
      } catch (error) {
        // FIXME: remove after all draft-js is formatted
        logger.error({
          name: 'FORMAT_DRAFT_ERROR',
          shopperLoginMessage,
          error,
        });

        return null;
      }
    },
  },
});
