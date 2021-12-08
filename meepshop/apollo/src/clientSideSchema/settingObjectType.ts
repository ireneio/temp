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
    }: SettingObjectTypeFragmentType) =>
      parseRawContent(shopperLoginMessage, logger),
  },
});
