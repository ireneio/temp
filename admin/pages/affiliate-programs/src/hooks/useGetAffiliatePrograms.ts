// typescript import
import { QueryResult } from '@apollo/client';

import { affiliateProgramsStatusType } from '../constants';

// import
import { useMemo, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

// graphql typescript
import {
  getAffiliatePrograms as getAffiliateProgramsType,
  getAffiliateProgramsVariables as getAffiliateProgramsVariablesType,
  getAffiliatePrograms_viewer_affiliatePrograms as getAffiliateProgramsViewerAffiliateProgramsType,
  setAffiliateProgramsCurrent as setAffiliateProgramsCurrentType,
  setAffiliateProgramsCurrentVariables as setAffiliateProgramsCurrentVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  getAffiliatePrograms,
  setAffiliateProgramsCurrent,
} from '../gqls/useGetAffiliatePrograms';

// definition
export default (): Pick<
  QueryResult<getAffiliateProgramsType, getAffiliateProgramsVariablesType>,
  'loading' | 'refetch'
> & {
  affiliatePrograms: getAffiliateProgramsViewerAffiliateProgramsType | null;
  affiliateProgramsStatus: affiliateProgramsStatusType;
  current: number;
  onChange: (current: number) => void;
} => {
  const { data, loading, fetchMore, refetch, variables } = useQuery<
    getAffiliateProgramsType,
    getAffiliateProgramsVariablesType
  >(getAffiliatePrograms);
  const [setCurrent] = useMutation<
    setAffiliateProgramsCurrentType,
    setAffiliateProgramsCurrentVariablesType
  >(setAffiliateProgramsCurrent);
  const affiliatePrograms = data?.viewer?.affiliatePrograms || null;
  const current = affiliatePrograms?.pageInfo.currentInfo.current || 0;
  const onChange = useCallback(
    (newCurrent: number) => {
      if (loading || !affiliatePrograms) return;

      if (
        newCurrent < current ||
        Math.ceil(affiliatePrograms.edges.length / 10) - 1 > current
      ) {
        setCurrent({
          variables: {
            input: { pageId: 'affiliate-programs', current: newCurrent },
          },
        });
        return;
      }

      fetchMore({
        variables: {
          after: affiliatePrograms?.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) =>
          !fetchMoreResult?.viewer?.affiliatePrograms
            ? previousResult
            : {
                ...previousResult,
                viewer: {
                  ...previousResult.viewer,
                  affiliatePrograms: {
                    ...previousResult.viewer?.affiliatePrograms,
                    edges: [
                      ...(previousResult.viewer?.affiliatePrograms?.edges ||
                        []),
                      ...fetchMoreResult.viewer.affiliatePrograms.edges,
                    ],
                    pageInfo: {
                      ...fetchMoreResult.viewer.affiliatePrograms.pageInfo,
                      currentInfo: {
                        ...fetchMoreResult.viewer.affiliatePrograms.pageInfo
                          .currentInfo,
                        __typename: 'CurrentInfo',
                        current: newCurrent,
                      },
                    },
                    total: fetchMoreResult.viewer.affiliatePrograms.total,
                  },
                },
              },
      });
    },
    [affiliatePrograms, current, fetchMore, loading, setCurrent],
  );

  useEffect(() => {
    if (
      affiliatePrograms &&
      Math.ceil(affiliatePrograms.edges.length / 10) - 1 < current
    )
      onChange(current);
  }, [affiliatePrograms, current, onChange]);

  return {
    loading,
    refetch,
    affiliatePrograms,
    affiliateProgramsStatus: useMemo(() => {
      if (variables?.filter?.searchTerm) return 'HAS_PROGRAMS';

      const affiliatePartners = data?.viewer?.affiliatePartners;

      if (affiliatePartners && affiliatePartners.total === 0)
        return 'NO_PARTNERS';

      if (affiliatePrograms && affiliatePrograms.total === 0)
        return 'NO_PROGRAMS';

      return 'HAS_PROGRAMS';
    }, [variables, data, affiliatePrograms]),
    current,
    onChange,
  };
};
