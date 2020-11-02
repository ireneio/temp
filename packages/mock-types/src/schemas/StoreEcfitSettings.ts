// import
import mock from '../mock';

// graphql typescript
import { storeEcfitSettingsMockFragment } from './gqls/__generated__/storeEcfitSettingsMockFragment';

// definition
export default mock.add<storeEcfitSettingsMockFragment>('StoreEcfitSettings', [
  () =>
    ({
      __typename: 'StoreEcfitSettings',
      isEnabled: true,
      serviceType: 'INTERTIDAL',
      companyToken: 'companyToken',
      apiKey: 'apiKey',
    } as storeEcfitSettingsMockFragment),
  () =>
    ({
      __typename: 'StoreEcfitSettings',
      isEnabled: true,
      serviceType: 'THIRD_PARTY_STORAGE',
      companyToken: 'companyToken',
      apiKey: 'apiKey',
    } as storeEcfitSettingsMockFragment),
  () =>
    ({
      __typename: 'StoreEcfitSettings',
      isEnabled: false,
    } as storeEcfitSettingsMockFragment),
]);
