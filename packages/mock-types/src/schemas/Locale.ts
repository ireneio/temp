// import
import mock from '../mock';

// graphql typescript
import { localeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<localeMockFragment>('Locale', [
  /* eslint-disable @typescript-eslint/camelcase */
  ({ zh_TW }: { zh_TW: string }) => ({
    __typename: 'Locale',
    zh_TW,
    en_US: zh_TW,
    ja_JP: zh_TW,
    vi_VN: zh_TW,
    fr_FR: zh_TW,
    es_ES: zh_TW,
    th_TH: zh_TW,
    id_ID: zh_TW,
  }),
  /* eslint-enable @typescript-eslint/camelcase */
]);
