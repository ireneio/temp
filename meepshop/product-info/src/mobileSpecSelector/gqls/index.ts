// import
import gql from 'graphql-tag';

// graphql import
import { titleProductFragment, titleVariantFragment } from './title';
import { addButtonFragment } from './addButton';

// definition
export const mobileSpecSelectorProductFragment = gql`
  fragment mobileSpecSelectorProductFragment on Product {
    id
    specs {
      id
    }
    ...titleProductFragment
  }

  ${titleProductFragment}
`;

export const mobileSpecSelectorVariantFragment = gql`
  fragment mobileSpecSelectorVariantFragment on Variant {
    id
    ...titleVariantFragment
    ...addButtonFragment
  }

  ${titleVariantFragment}
  ${addButtonFragment}
`;
