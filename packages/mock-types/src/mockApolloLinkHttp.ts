// import
import { SchemaLink } from 'apollo-link-schema';

import schema from './schema';

// definition
class MockApolloLinkHttp extends SchemaLink {
  constructor() {
    super({ schema });
  }
}

export const HttpLink = MockApolloLinkHttp;
