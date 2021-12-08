// typescript import
import { Resolvers } from '@apollo/client';

// typescript definition
interface DefaultDataType {
  defaultHomePage?: {
    id: string;
  };
  defaultProductTemplatePage?: {
    id: string;
  };
}

// definition
export const resolvers: Resolvers = {
  Page: {
    isDefaultHomePage: ({
      id,
      defaultHomePage,
    }: DefaultDataType & { id: string }) => id === defaultHomePage?.id,
    isDefaultProductTemplatePage: ({
      id,
      defaultProductTemplatePage,
    }: DefaultDataType & { id: string }) =>
      id === defaultProductTemplatePage?.id,
  },
  PageEdge: {
    node: ({
      node,
      defaultHomePage,
      defaultProductTemplatePage,
    }: DefaultDataType & { node?: {} }) =>
      !node
        ? null
        : {
            ...node,
            defaultHomePage,
            defaultProductTemplatePage,
          },
  },
  PageConnection: {
    edges: ({
      edges,
      defaultHomePage,
      defaultProductTemplatePage,
    }: DefaultDataType & { edges?: [{}] }) =>
      edges?.map(edge =>
        !edge
          ? null
          : {
              ...edge,
              defaultHomePage,
              defaultProductTemplatePage,
            },
      ),
  },
  Store: {
    pages: (
      {
        defaultHomePage,
        defaultProductTemplatePage,
        ...data
      }: DefaultDataType & { [key: string]: {} },
      _,
      __,
      info,
    ) => ({
      ...data[info?.field.alias?.value || 'pages'],
      defaultHomePage,
      defaultProductTemplatePage,
    }),
  },
};
