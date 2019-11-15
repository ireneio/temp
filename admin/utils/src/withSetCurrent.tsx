// typescript import
import { MutationFunction } from '@apollo/react-common';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';

// graphql typescript
import { setCurrent, setCurrentVariables } from './__generated__/setCurrent';

// typescript definition
export interface SetCurrentPropsType {
  setCurrent: (
    current: number,
  ) => ReturnType<MutationFunction<setCurrent, setCurrentVariables>>;
}

// definition
export default (pageId: string) => <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithSetCurrent = (
    props: Omit<P, keyof SetCurrentPropsType>,
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
