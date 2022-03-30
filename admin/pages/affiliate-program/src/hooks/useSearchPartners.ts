// import
import { useRef, useState, useCallback, useEffect } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { emptyFunction } from 'fbjs';

// graphql typescript
import {
  searchPartners as searchPartnersType,
  searchPartnersVariables as searchPartnersVariablesType,
  searchPartners_viewer_affiliatePartners_edges_node as searchPartnersViewerAffiliatePartnersEdgesNodeType,
  searchPartner as searchPartnerType,
  searchPartnerVariables as searchPartnerVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { searchPartners, searchPartner } from '../gqls/useSearchPartners';

// typescript definition
interface PartnersType {
  partners: searchPartnersViewerAffiliatePartnersEdgesNodeType[];
  searchPartners: (value?: string) => void;
}

// definition
export default (initialAffiliatePartnerId: string | null): PartnersType => {
  const client = useApolloClient();
  const { data } = useQuery<searchPartnerType, searchPartnerVariablesType>(
    searchPartner,
    {
      variables: {
        affiliatePartnerId: initialAffiliatePartnerId || 'null-id',
      },
      skip: !initialAffiliatePartnerId,
    },
  );
  const [partners, setPartners] = useState<PartnersType['partners']>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );

  useEffect(() => {
    const affiliatePartner = data?.viewer?.affiliatePartner;

    if (affiliatePartner) setPartners([affiliatePartner]);
  }, [initialAffiliatePartnerId, data, setPartners]);

  return {
    partners,
    searchPartners: useCallback(
      value => {
        if (!value) return;

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
          const { data: partnersData } = await client.query<
            searchPartnersType,
            searchPartnersVariablesType
          >({
            query: searchPartners,
            variables: {
              filter: {
                searchTerm: value,
              },
            },
          });

          setPartners(
            (partnersData?.viewer?.affiliatePartners?.edges || []).map(
              ({ node }) => node,
            ),
          );
        }, 500);
      },
      [client, setPartners],
    ),
  };
};
