// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { ImageTextModuleMock } from './__generated__/ImageTextModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ImageTextModuleMock on ImageTextModule {
    width
    title {
      content
      fontSize
    }
    description {
      content
      fontSize
    }
    button {
      content
      fontSize
    }
    titleBold
    color
    hoverColor
    position
    alt
  }
`;

export default mock.add<ImageTextModuleMock>('ImageTextModule', [
  () =>
    ({
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
      position: 'LEFT_TOP',
      alt: 'ImageTextModule',
    } as ImageTextModuleMock),
]);
