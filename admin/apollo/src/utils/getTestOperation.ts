// typescript import
import { Operation } from '@apollo/client';

// import
import { getMainDefinition } from '@apollo/client/utilities';

// definition
export default (name: string) => ({ query }: Operation): boolean => {
  const definition = getMainDefinition(query);

  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'mutation' &&
    definition.name?.value === name
  );
};
