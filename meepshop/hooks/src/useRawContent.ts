// typescript import

// import
import { useMemo } from 'react';

import { useQuery } from '@apollo/react-hooks';

// graphql typescript
import {
  getDraftText as getDraftTextType,
  getDraftTextVariables as getDraftTextVariablesType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { getDraftText } from './gqls/useRawContent';

// definition
export default (value?: string | null): object | null => {
  const { data } = useQuery<getDraftTextType, getDraftTextVariablesType>(
    getDraftText,
    {
      variables: {
        input: value,
      },
    },
  );

  const draftText = data?.getDraftText || null;

  return useMemo(() => draftText, [draftText]);
};
