// graphql typescript
import {
  userUserFragment as userUserFragmentType,
  userAuthorityListFragment as userAuthorityListFragmentType,
} from '@meepshop/types/gqls/admin';

// definition
export const resolvers = {
  User: {
    permission: ({
      groupId,
      getAuthorityList,
    }: userUserFragmentType & {
      getAuthorityList?: userAuthorityListFragmentType;
    }) =>
      getAuthorityList?.data?.find(list => list?.id === groupId)?.permission ||
      null,
  },
  Query: {
    viewer: ({
      viewer,
      getAuthorityList,
    }: {
      viewer?: userUserFragmentType;
      getAuthorityList: userAuthorityListFragmentType;
    }) =>
      !viewer
        ? null
        : {
            ...viewer,
            getAuthorityList,
          },
  },
};
