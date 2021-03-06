// import
import mock from '../mock';

// graphql typescript
import {
  EcfitServiceTypeEnum,
  storeEcfitSettingsMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<storeEcfitSettingsMockFragment>('StoreEcfitSettings', [
  () => ({
    __typename: 'StoreEcfitSettings',
    isEnabled: true,
    serviceType: 'INTERTIDAL' as EcfitServiceTypeEnum,
    companyToken: 'companyToken',
    apiKey: 'apiKey',
  }),
  () => ({
    __typename: 'StoreEcfitSettings',
    isEnabled: true,
    serviceType: 'THIRD_PARTY_STORAGE' as EcfitServiceTypeEnum,
    companyToken: 'companyToken',
    apiKey: 'apiKey',
  }),
  () => ({
    __typename: 'StoreEcfitSettings',
    isEnabled: false,
    serviceType: null,
    companyToken: null,
    apiKey: null,
  }),
]);
