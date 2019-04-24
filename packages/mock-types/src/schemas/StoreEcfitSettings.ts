// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { StoreEcfitSettingsMock } from './__generated__/StoreEcfitSettingsMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment StoreEcfitSettingsMock on StoreEcfitSettings {
    isEnabled
    serviceType
    companyToken
    apiKey
  }

  ${localeFragment}
`;

export default mock.add<StoreEcfitSettingsMock>('StoreEcfitSettings', [
  () =>
    ({
      __typename: 'StoreEcfitSettings',
      isEnabled: true,
      serviceType: 'INTERTIDAL',
      companyToken: 'companyToken',
      apiKey: 'apiKey',
    } as StoreEcfitSettingsMock),
  () =>
    ({
      __typename: 'StoreEcfitSettings',
      isEnabled: true,
      serviceType: 'THIRD_PARTY_STORAGE',
      companyToken: 'companyToken',
      apiKey: 'apiKey',
    } as StoreEcfitSettingsMock),
  () =>
    ({
      __typename: 'StoreEcfitSettings',
      isEnabled: false,
    } as StoreEcfitSettingsMock),
]);
