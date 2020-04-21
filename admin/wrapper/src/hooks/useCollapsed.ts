// import
import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import { useCollapsedFragment as useCollapsedFragmentType } from './__generated__/useCollapsedFragment';
import {
  setMenuCollapsed,
  setMenuCollapsedVariables,
} from './__generated__/setMenuCollapsed';

// definition
export const useCollapsedFragment = gql`
  fragment useCollapsedFragment on Cookies {
    id
    menuCollapsed
  }
`;

export default (
  cookies: useCollapsedFragmentType | null | undefined,
): {
  isDone: boolean;
  collapsed: boolean;
  onBreakpoint: (breakpoint: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
} => {
  const [isDone, setIsDone] = useState(false);
  const [isOnBreakpoint, setIsOnBreakpoint] = useState<null | boolean>(null);
  const [setCookies] = useMutation<
    setMenuCollapsed,
    setMenuCollapsedVariables
  >(gql`
    mutation setMenuCollapsed($input: SetCookiesInput!) {
      setCookies(input: $input) @client
    }
  `);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      Boolean(cookies) &&
      isOnBreakpoint !== null
    )
      setIsDone(true);
  }, [cookies, isOnBreakpoint]);

  return {
    isDone,
    collapsed: Boolean(cookies?.menuCollapsed || isOnBreakpoint),
    onBreakpoint: setIsOnBreakpoint,
    setCollapsed: useCallback(
      (collapsed: boolean) => {
        if (!isOnBreakpoint)
          setCookies({
            variables: {
              input: { menuCollapsed: collapsed },
            },
          });
      },
      [isOnBreakpoint, setCookies],
    ),
  };
};
