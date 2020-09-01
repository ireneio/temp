// import
import gql from 'graphql-tag';

// graphql typescript
import {
  userFragment as userFragmentType,
  userFragment_group as userFragmentGroup,
} from './__generated__/userFragment';

// definition
export const userFragment = gql`
  fragment userFragment on User {
    id
    groupId
    groupServer: group {
      startDate
      expireDate
      unlimitedDate
    }
    group: groupClient @client {
      id
    }
    store {
      id
      memberGroups(filter: { status: ENABLED }) {
        id
        type
        name
      }
    }
  }
`;

export const resolvers = {
  User: {
    groupClient: async ({ groupId, groupServer, store }: userFragmentType) => {
      const group =
        groupServer instanceof Array
          ? groupServer[groupServer.length - 1]
          : null;

      if (!groupId || !group) return null;

      const { name, type } =
        store?.memberGroups.find(
          (memberGroup: userFragmentGroup) => memberGroup.id === groupId,
        ) || {};

      return {
        ...group,
        __typename: 'MemberGroup',
        id: groupId,
        type,
        name,
      };
    },
  },
};
