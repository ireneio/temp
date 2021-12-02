// import
import { gql } from '@apollo/client';

// graphql import
import {
  useTitleUserFragment,
  useTitleMenuPageObjectTypeFragment,
} from './useTitle';
import {
  useHrefUserFragment,
  useHrefMenuPageObjectTypeFragment,
} from './useHref';

// definition
export const titleUserFragment = gql`
  fragment titleUserFragment on User {
    id
    ...useTitleUserFragment
    ...useHrefUserFragment
  }

  ${useTitleUserFragment}
  ${useHrefUserFragment}
`;

export const titleMenuPageObjectTypeFragment = gql`
  fragment titleMenuPageObjectTypeFragment on MenuPageObjectType {
    id
    action
    image {
      __typename

      ... on DefaultIcon {
        icon
      }

      ... on Image {
        id
        scaledSrc {
          w60
          w120
          w240
        }
      }
    }
    imagePosition
    newWindow
    ...useTitleMenuPageObjectTypeFragment
    ...useHrefMenuPageObjectTypeFragment
  }

  ${useTitleMenuPageObjectTypeFragment}
  ${useHrefMenuPageObjectTypeFragment}
`;

export const titleMenuDesignObjectTypeFragment = gql`
  fragment titleMenuDesignObjectTypeFragment on MenuDesignObjectType {
    iconSize
  }
`;
