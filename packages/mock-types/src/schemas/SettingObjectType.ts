// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { SettingObjectTypeMock } from './__generated__/SettingObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment SettingObjectTypeMock on SettingObjectType {
    lockedBirthday
  }
`;

export default mock.add<SettingObjectTypeMock>('SettingObjectType', [
  () => ({
    __typename: 'SettingObjectType',
    lockedBirthday: false,
  }),
  () => ({
    __typename: 'SettingObjectType',
    lockedBirthday: true,
  }),
]);
