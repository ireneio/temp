// import
import mock from '../mock';

// graphql typescript
import {
  ImageTextModulePosition,
  imageTextModuleMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<imageTextModuleMockFragment>('ImageTextModule', [
  () => ({
    __typename: 'ImageTextModule',
    image: null,
    link: null,
    width: 100,
    title: {
      __typename: 'ImageTextModuleField',
      content: 'title',
      fontSize: 24,
    },
    description: {
      __typename: 'ImageTextModuleField',
      content: 'description',
      fontSize: 20,
    },
    button: {
      __typename: 'ImageTextModuleField',
      content: 'button',
      fontSize: 16,
    },
    titleBold: true,
    color: '#003380',
    hoverColor: '#cccccc',
    buttonHoverColor: '#ffffff',
    position: 'LEFT_TOP' as ImageTextModulePosition,
    alt: 'ImageTextModule',
  }),
]);
