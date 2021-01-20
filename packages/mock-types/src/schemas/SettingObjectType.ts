// import
import mock from '../mock';

// graphql typescript
import { settingObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<settingObjectTypeMockFragment>('SettingObjectType', [
  () => ({
    __typename: 'SettingObjectType',
    lockedBirthday: false,
  }),
  () => ({
    __typename: 'SettingObjectType',
    lockedBirthday: true,
  }),
]);
