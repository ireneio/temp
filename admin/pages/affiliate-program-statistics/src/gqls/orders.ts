// import
import { gql } from '@apollo/client';

// graphql import
import { useProgramStatisticsColumnsFragment } from './useProgramStatisticsColumns';
import { useProgramStatisticsLoadMoreFragment } from './useProgramStatisticsLoadMore';

// definition
export const ordersAffiliateProgramOrdersConnectionFragment = gql`
  fragment ordersAffiliateProgramOrdersConnectionFragment on AffiliateProgramOrdersConnection {
    ...useProgramStatisticsLoadMoreFragment
    edges {
      ...useProgramStatisticsColumnsFragment
    }
    total
  }

  ${useProgramStatisticsColumnsFragment}
  ${useProgramStatisticsLoadMoreFragment}
`;
