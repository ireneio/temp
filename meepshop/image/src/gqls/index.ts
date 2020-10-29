// import
import gql from 'graphql-tag';

// graphql import
import { useImageScaledURLsFragment, useImageImageFragment } from './useImage';
import { useLinkFragment } from './useLink';

// definition
export { useImageScaledURLsFragment, useImageImageFragment, useLinkFragment };

export const imageFragment = gql`
  fragment imageFragment on ImageModule {
    id
    image {
      ...useImageImageFragment
    }
    link {
      ...useLinkFragment
    }
    width
    justifyContent
    alt
  }

  ${useImageImageFragment}
  ${useLinkFragment}
`;
