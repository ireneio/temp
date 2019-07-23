// typescript import
import { MutationFn } from 'react-apollo';

import { OmitType } from './types';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

// graphql typescript
import { setCurrent, setCurrentVariables } from './__generated__/setCurrent';

// typescript definition
export interface SetCurrentPropsType {
  setCurrent: (
    current: number,
  ) => ReturnType<MutationFn<setCurrent, setCurrentVariables>>;
}

// definition
export default (pageId: string) => <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithSetCurrent = (
    props: OmitType<P, keyof SetCurrentPropsType>,
  ): React.ReactElement => (
    <Mutation<setCurrent, setCurrentVariables>
      mutation={gql`
        mutation setCurrent($input: SetCurrentInput!) {
          setCurrent(input: $input) @client
        }
      `}
    >
      {setCurrentMutation => (
        <Component
          {...(props as P)}
          setCurrent={(current: number) =>
            setCurrentMutation({
              variables: {
                input: {
                  pageId,
                  current,
                },
              },
            })
          }
        />
      )}
    </Mutation>
  );

  return WithSetCurrent;
};
