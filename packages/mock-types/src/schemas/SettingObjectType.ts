// import
import mock from '../mock';

// graphql typescript
import { settingObjectTypeMockFragment } from './gqls/__generated__/settingObjectTypeMockFragment';

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
