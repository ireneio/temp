// typescript import
import { NextPage } from 'next';

// import
import React, { useEffect, useRef } from 'react';
import { useApolloClient } from '@apollo/client';
import { areEqual } from 'fbjs';

import { useCrossContextEvents } from '@admin/hooks';
import Newsletter from '@admin/newsletter';

import './styles/index.less';

// graphql typescript
import {
  NewNewsLetter as NewNewsLetterType,
  getNewsletter as getNewsletterType,
  getNewsletterVariables as getNewsletterVariablesType,
} from '@meepshop/types/gqls/admin';

// grphaql import
import { getNewsletter } from './gqls/index';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  id: string;
  noWrapper: true;
}

interface CrossPropsType extends NewNewsLetterType {
  close?: boolean;
}

// definition
const RefactorNewsletter: NextPage<PropsType> = React.memo(({ id }) => {
  const [, setProps] = useCrossContextEvents<CrossPropsType>(
    `newsletter/${id}`,
    {},
  );
  const client = useApolloClient();
  const newsletterRef = useRef<getNewsletterType>();

  useEffect(() => {
    const newsletterQuery = client
      .watchQuery<getNewsletterType, getNewsletterVariablesType>({
        query: getNewsletter,
        variables: {
          isNew: id === 'undefined',
          id,
          search: { size: 1, from: 0 },
        },
        fetchPolicy: 'cache-only',
      })
      .subscribe(({ data }) => {
        if (id === 'undefined') {
          const newsletter = data?.getNewsLetterList?.data?.[0];

          if (newsletter) setProps(newsletter);
        } else {
          const newsletter = data?.viewer?.store?.edm;

          if (newsletter) {
            if (!areEqual(data, newsletterRef.current) && newsletterRef.current)
              setProps(newsletter);

            newsletterRef.current = data;
          }
        }
      });

    return () => {
      newsletterQuery.unsubscribe();
    };
  }, [client, setProps, id]);

  return <Newsletter id={id} onClose={() => setProps({ close: true })} />;
});

RefactorNewsletter.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  id: query.id as string,
  noWrapper: true,
});

export default RefactorNewsletter;
