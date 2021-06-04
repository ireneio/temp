// import
import gql from 'graphql-tag';

// graphql import
import { cathayAtmFragment } from './CathayAtm';
import { gmoAtmFragment } from './GmoAtm';
import { gmoCvsFragment } from './GmoCvs';

// definition
export const infoFragment = gql`
  fragment infoFragment on Order {
    id
    paymentInfo {
      id
      list {
        id
        template
      }
    }

    ...cathayAtmFragment
    ...gmoAtmFragment
    ...gmoCvsFragment
  }

  ${cathayAtmFragment}
  ${gmoAtmFragment}
  ${gmoCvsFragment}
`;
