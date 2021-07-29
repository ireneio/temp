// import
import { parseRawContent } from './utils/parseRawContent';

// graphql typescript
import { SettingObjectTypeFragment as SettingObjectTypeFragmentType } from '@meepshop/types/gqls/meepshop';

// definition
export const resolvers = {
  SettingObjectType: {
    shopperLoginMessageDraft: ({
      shopperLoginMessage,
    }: SettingObjectTypeFragmentType) => parseRawContent(shopperLoginMessage),
  },
};
