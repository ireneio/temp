// typescript import
import { ContextType } from './constants';

// import
import idx from 'idx';
import { gql } from 'apollo-boost';

// typescript definition
interface UserType {
  additionalInfo?: {
    tel?: string;
    mobile?: string;
    address?: {
      postalCode?: string;
      yahooCode?: {
        country?: string;
        city?: string;
        county?: string;
        street?: string;
      };
    };
  };
}

// definition
export const resolver = {
  User: {
    tel: ({ additionalInfo }: UserType) =>
      idx(additionalInfo, _ => _.tel) || null,
    mobile: ({ additionalInfo }: UserType) =>
      idx(additionalInfo, _ => _.mobile) || null,
    postalCode: ({ additionalInfo }: UserType) =>
      idx(additionalInfo, _ => _.address.postalCode) || null,
    country: ({ additionalInfo }: UserType) =>
      idx(additionalInfo, _ => _.address.yahooCode.country) || null,
    city: ({ additionalInfo }: UserType) =>
      idx(additionalInfo, _ => _.address.yahooCode.city) || null,
    county: ({ additionalInfo }: UserType) =>
      idx(additionalInfo, _ => _.address.yahooCode.county) || null,
    street: ({ additionalInfo }: UserType) =>
      idx(additionalInfo, _ => _.address.yahooCode.street) || null,
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
          getMemberGroupList: { data: memberGroupList },
        },
      } = await client.query({
        query: gql`
          query getMemberGroupList {
            getMemberGroupList(
              search: {
                size: 50
                from: 0
                filter: {
                  and: [{ type: "exact", field: "status", query: "1" }]
                }
              }
            ) {
              data {
                id
                type
                name
              }
            }
          }
        `,
      });

      const { name, type } = memberGroupList.find(
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
