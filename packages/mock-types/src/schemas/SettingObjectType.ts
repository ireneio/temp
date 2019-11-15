// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { SettingObjectTypeMock } from './__generated__/SettingObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment SettingObjectTypeMock on SettingObjectType {
    lockedCountry
    lockedBirthday
  }
`;

export default mock.add<SettingObjectTypeMock>('SettingObjectType', [
  () => ({
    __typename: 'SettingObjectType',
    lockedCountry: null,
    lockedBirthday: false,
  }),
  () => ({
    __typename: 'SettingObjectType',
    lockedCountry: ['台灣'],
    lockedBirthday: true,
  }),
]);
