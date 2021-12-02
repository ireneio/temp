// import
import { gql } from '@apollo/client';

// graphql import
import { useLinkFragment } from '@meepshop/hooks/lib/gqls/useLink';

import { useImageScaledURLsFragment, useImageImageFragment } from './useImage';

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
