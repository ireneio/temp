// typescript import
import { QueryResult } from '@apollo/client';

// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

// graphql typescript
import {
  getAffiliateProgramStatistics as getAffiliateProgramStatisticsType,
  getAffiliateProgramStatisticsVariables as getAffiliateProgramStatisticsVariablesType,
  getAffiliateProgramStatistics_viewer_affiliateProgramStatistics_AffiliateProgramStatistics as getAffiliateProgramStatisticsViewerAffiliateProgramStatisticsAffiliateProgramStatisticsType,
  getAffiliateProgramStatistics_viewer_affiliateProgramOrders as getAffiliateProgramStatisticsViewerAffiliateProgramOrdersType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getAffiliateProgramStatistics } from '../gqls/useAffiliateProgramStatistics';

// typescript definition
interface AffiliateProgramStatisticsType
  extends Pick<
    QueryResult<
      getAffiliateProgramStatisticsType,
      getAffiliateProgramStatisticsVariablesType
    >,
    'loading' | 'fetchMore'
  > {
  affiliateProgramStatistics: getAffiliateProgramStatisticsViewerAffiliateProgramStatisticsAffiliateProgramStatisticsType | null;
  affiliateProgramOrders: getAffiliateProgramStatisticsViewerAffiliateProgramOrdersType | null;
}

// definition
export default (affiliateProgramId: string): AffiliateProgramStatisticsType => {
  const { data, loading, fetchMore } = useQuery<
    getAffiliateProgramStatisticsType,
    getAffiliateProgramStatisticsVariablesType
  >(getAffiliateProgramStatistics, {
    variables: {
      affiliateProgramId,
      first: 10,
    },
  });

  return useMemo(() => {
    const viewer = data?.viewer;

    return {
      loading,
      fetchMore,
      affiliateProgramStatistics:
        viewer?.affiliateProgramStatistics?.__typename !==
        'AffiliateProgramStatistics'
          ? null
          : viewer.affiliateProgramStatistics,
      affiliateProgramOrders: viewer?.affiliateProgramOrders || null,
    };
  }, [data, loading, fetchMore]);
};
