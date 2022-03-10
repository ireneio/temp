// import
import { useRef, useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { emptyFunction } from 'fbjs';

// graphql typescript
import {
  searchPartners as searchPartnersType,
  searchPartnersVariables as searchPartnersVariablesType,
  searchPartners_viewer_affiliatePartners_edges_node as searchPartnersViewerAffiliatePartnersEdgesNodeType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { searchPartners } from '../gqls/useSearchPartners';

// typescript definition
interface PartnersType {
  partners: searchPartnersViewerAffiliatePartnersEdgesNodeType[];
  searchPartners: (value?: string) => void;
}

// definition
export default (): PartnersType => {
  const client = useApolloClient();
  const [partners, setPartners] = useState<PartnersType['partners']>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(
    setTimeout(emptyFunction, 0),
  );

  return {
    partners,
    searchPartners: useCallback(
      value => {
        if (!value) return;

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
          const { data } = await client.query<
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
            (data?.viewer?.affiliatePartners?.edges || []).map(
              ({ node }) => node,
            ),
          );
        }, 100);
      },
      [client, setPartners],
    ),
  };
};
