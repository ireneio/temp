// import
import gql from 'graphql-tag';

// graphql import
import {
  useTitleUserFragment,
  useTitleMenuPageObjectTypeFragment,
} from '../hooks/fragments/useTitle';
import {
  useHrefUserFragment,
  useHrefMenuPageObjectTypeFragment,
} from '../hooks/fragments/useHref';

// definition
export {
  useTitleUserFragment,
  useTitleMenuPageObjectTypeFragment,
  useHrefUserFragment,
  useHrefMenuPageObjectTypeFragment,
};

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
    fontSize
  }
`;
