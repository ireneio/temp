// import
import uuid from 'uuid/v4';

// graphql typescript
import { JustifyContent } from '../../__generated__/meepshop';

// definition
export default {
  __typename: 'SmartConversionModule' as const,
  id: uuid(),
  displaySample: {
    __typename: 'SmartConversionModuleSample' as const,
    eventName: 'SmartConversionModuleSample',
    image: null,
  },
  width: 100,
  align: 'CENTER' as JustifyContent,
  imageAlt: 'imageAlt',
  page: {
    __typename: 'Page' as const,
    id: 'page-id',
  },
};
