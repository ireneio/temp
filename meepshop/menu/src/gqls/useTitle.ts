// import
import gql from 'graphql-tag';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useTitleUserFragment = gql`
  fragment useTitleUserFragment on User {
    id
    role
    memberGroup {
      id
      name
    }
  }
`;

export const useTitleMenuPageObjectTypeFragment = gql`
  fragment useTitleMenuPageObjectTypeFragment on MenuPageObjectType {
    id
    action
    title {
      ...localeFragment
    }
    params {
      displayMemberGroup
    }
  }

  ${localeFragment}
`;
