// typescript import
import { IntrospectionResultData } from 'apollo-cache-inmemory';

// typescript definition
export interface IntrospectionQueryResultDataType {
  [key: string]: string[];
}

// definition
export default (
  introspectionQueryResultData: IntrospectionQueryResultDataType,
): IntrospectionResultData['__schema']['types'] =>
  Object.keys(introspectionQueryResultData).map(name => ({
    kind: 'UNION',
    name,
    possibleTypes: introspectionQueryResultData[name].map(possibleType => ({
      name: possibleType,
    })),
  }));
