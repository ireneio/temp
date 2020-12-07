// import
import uuid from 'uuid/v4';

// graphql typescript
import { smartConversionFragment } from './src/gqls/__generated__/smartConversionFragment';

// definition
export default {
  __typename: 'SmartConversionModule',
  id: uuid(),
  displaySample: {
    __typename: 'SmartConversionModuleSample',
    eventName: 'SmartConversionModuleSample',
    image: null,
  },
  width: 100,
  align: 'CENTER',
  imageAlt: 'imageAlt',
  page: {
    id: 'page-id',
  },
} as smartConversionFragment;
