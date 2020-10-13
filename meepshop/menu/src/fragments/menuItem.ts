// import
import gql from 'graphql-tag';

// graphql import
import {
  titleUserFragment,
  titleMenuPageObjectTypeFragment,
  titleMenuDesignObjectTypeFragment,
} from './title';
import {
  usePagesWithActionUserFragment,
  usePagesWithActionMenuPageObjectTypeFragment,
} from '../hooks/fragments/usePagesWithAction';
import {
  useClickUserFragment,
  useClickMenuPageObjectTypeFragment,
} from '../hooks/fragments/useClick';

// definition
export {
  titleUserFragment,
  titleMenuPageObjectTypeFragment,
  titleMenuDesignObjectTypeFragment,
  usePagesWithActionUserFragment,
  usePagesWithActionMenuPageObjectTypeFragment,
  useClickUserFragment,
  useClickMenuPageObjectTypeFragment,
};

export const menuItemUserFragment = gql`
  fragment menuItemUserFragment on User {
    id
    ...titleUserFragment
    ...usePagesWithActionUserFragment
    ...useClickUserFragment
  }

  ${titleUserFragment}
  ${usePagesWithActionUserFragment}
  ${useClickUserFragment}
`;

export const menuItemOrderFragment = gql`
  fragment menuItemOrderFragment on Order {
    id
    categories {
      id
      products {
        id
        type
        quantity
      }
    }
  }
`;

export const menuItemMenuPageObjectTypeFragment = gql`
  fragment menuItemMenuPageObjectTypeFragment on MenuPageObjectType {
    id
    action
    ...titleMenuPageObjectTypeFragment
    ...usePagesWithActionMenuPageObjectTypeFragment
    ...useClickMenuPageObjectTypeFragment
  }

  ${titleMenuPageObjectTypeFragment}
  ${usePagesWithActionMenuPageObjectTypeFragment}
  ${useClickMenuPageObjectTypeFragment}
`;

export const menuItemMenuDesignObjectTypeFragment = gql`
  fragment menuItemMenuDesignObjectTypeFragment on MenuDesignObjectType {
    ...titleMenuDesignObjectTypeFragment
  }

  ${titleMenuDesignObjectTypeFragment}
`;
