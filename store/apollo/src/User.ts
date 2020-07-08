// typescript import
import { ContextType } from './constants';

// import
import gql from 'graphql-tag';

// typescript definition
interface UserType {
  additionalInfo?: {
    tel?: string;
    mobile?: string;
  };
}

// definition
export const resolvers = {
  User: {
    tel: ({ additionalInfo }: UserType) => additionalInfo?.tel || null,
    mobile: ({ additionalInfo }: UserType) => additionalInfo?.mobile || null,
    groupClient: async (
      {
        groupId,
        groupServer,
      }: {
        // TODO: should not be null
        groupId: string | null;
        groupServer:
          | {
              __typename: 'UserMemberGroupObjectType';
              startDate: number | null;
              expireDate: number | null;
              unlimitedDate: boolean;
            }[]
          | null;
      },
      __: unknown,
      { client }: ContextType,
    ) => {
      const group =
        groupServer instanceof Array
          ? groupServer[groupServer.length - 1]
          : null;

      if (!groupId || !group) return null;

      const {
        data: {
          viewer: {
            store: { memberGroups },
          },
        },
      } = await client.query({
        query: gql`
          query getMemberGroups {
            viewer {
              id
              store {
                id
                memberGroups(filter: { status: ENABLED }) {
                  id
                  type
                  name
                }
              }
            }
          }
        `,
      });

      const { name, type } = memberGroups.find(
        (memberGroup: { id: string }) => memberGroup.id === groupId,
      );

      return {
        __typename: 'MemberGroup',
        id: groupId,
        type,
        name,
        startDate: group.startDate,
        expireDate: group.expireDate,
        unlimitedDate: group.unlimitedDate,
      };
    },
  },
};