// typescript import
import { QueryResult } from '@apollo/client';

// import
import { useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

// graphql typescript
import {
  getAffiliatePartners as getAffiliatePartnersType,
  getAffiliatePartnersVariables as getAffiliatePartnersVariablesType,
  getAffiliatePartners_viewer_affiliatePartners as getAffiliatePartnersViewerAffiliatePartnersType,
  setAffiliatePartnersCurrent as setAffiliatePartnersCurrentType,
  setAffiliatePartnersCurrentVariables as setAffiliatePartnersCurrentVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  getAffiliatePartners,
  setAffiliatePartnersCurrent,
} from '../gqls/useGetAffiliatePartners';

// definition
export default (): Pick<
  QueryResult<getAffiliatePartnersType, getAffiliatePartnersVariablesType>,
  'loading' | 'refetch'
> & {
  affiliatePartners: getAffiliatePartnersViewerAffiliatePartnersType | null;
  noAffiliatePartners: boolean;
  current: number;
  onChange: (current: number) => void;
} => {
  const { data, loading, fetchMore, refetch, variables } = useQuery<
    getAffiliatePartnersType,
    getAffiliatePartnersVariablesType
  >(getAffiliatePartners);
  const [setCurrent] = useMutation<
    setAffiliatePartnersCurrentType,
    setAffiliatePartnersCurrentVariablesType
  >(setAffiliatePartnersCurrent);
  const affiliatePartners = data?.viewer?.affiliatePartners || null;
  const current = affiliatePartners?.pageInfo.currentInfo.current || 0;
  const onChange = useCallback(
    (newCurrent: number) => {
      if (loading || !affiliatePartners) return;

      if (
        newCurrent < current ||
        Math.ceil(affiliatePartners.edges.length / 10) - 1 > current
      ) {
        setCurrent({
          variables: {
            input: { pageId: 'affiliate-partners', current: newCurrent },
          },
        });
        return;
      }

      fetchMore({
        variables: {
          after: affiliatePartners?.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) =>
          !fetchMoreResult?.viewer?.affiliatePartners
            ? previousResult
            : {
                ...previousResult,
                viewer: {
                  ...previousResult.viewer,
                  affiliatePartners: {
                    ...previousResult.viewer?.affiliatePartners,
                    edges: [
                      ...(previousResult.viewer?.affiliatePartners?.edges ||
                        []),
                      ...fetchMoreResult.viewer.affiliatePartners.edges,
                    ],
                    pageInfo: {
                      ...fetchMoreResult.viewer.affiliatePartners.pageInfo,
                      currentInfo: {
                        ...fetchMoreResult.viewer.affiliatePartners.pageInfo
                          .currentInfo,
                        __typename: 'CurrentInfo',
                        current: newCurrent,
                      },
                    },
                    total: fetchMoreResult.viewer.affiliatePartners.total,
                  },
                },
              },
      });
    },
    [affiliatePartners, current, fetchMore, loading, setCurrent],
  );

  useEffect(() => {
    if (
      affiliatePartners &&
      Math.ceil(affiliatePartners.edges.length / 10) - 1 < current
    )
      onChange(current);
  }, [affiliatePartners, current, onChange]);

  return {
    loading,
    refetch,
    affiliatePartners,
    noAffiliatePartners: Boolean(
      variables?.filter?.searchTerm &&
        affiliatePartners &&
        affiliatePartners.total === 0,
    ),
    current,
    onChange,
  };
};
