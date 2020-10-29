// import
import React, { useEffect, useRef, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon, Table } from 'antd';
import { areEqual } from 'fbjs';
import { filter } from 'graphql-anywhere';

import useColumns from './hooks/useColumns';

import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/index.less';

// graphql typescript
import {
  getWishlist as getWishlistType,
  getWishlist_viewer_wishlist as getWishlistViewerWishlistType,
} from './gqls/__generated__/getWishlist';

// graphql import
import { getWishlist } from './gqls';
import { useColumnsFragment } from './gqls/useColumns';

// typescript definition
// TODO: remove after removing redux
interface PropsType {
  wishListFromRedux?: unknown;
  dispatchAction: (dispatchName: string, data: unknown) => void;
}

// definition
export default React.memo(
  ({ dispatchAction, wishListFromRedux }: PropsType) => {
    const prevWishListFromReduxRef = useRef<unknown>(null);
    const prevWishListFromRedux = prevWishListFromReduxRef.current;

    const columns = useColumns(dispatchAction);
    const colors = useContext(ColorsContext);

    const { data, refetch } = useQuery<getWishlistType>(getWishlist, {
      fetchPolicy: 'no-cache',
    });
    const wishlist = data?.viewer?.wishlist;

    useEffect(() => {
      if (!areEqual(wishListFromRedux, prevWishListFromRedux)) refetch();
      prevWishListFromReduxRef.current = wishListFromRedux;
    }, [wishListFromRedux, prevWishListFromRedux, refetch]);

    if (!wishlist) return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <div className={styles.root}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                .${styles.root} .ant-table {
                  color: ${colors[3]};
                }
  
                .${styles.root} .ant-table-thead > tr > th {
                  color: ${colors[3]};
                }
  
                .${styles.root} .ant-table-tbody > tr:hover > td {
                  background: ${colors[4]};
                }
              `,
          }}
        />
        <Table
          rowKey={({ productId }) => productId}
          columns={columns}
          dataSource={filter<getWishlistViewerWishlistType[]>(
            useColumnsFragment,
            wishlist.filter(Boolean) /** SHOULD_NOT_BE_NULL */,
          )}
          pagination={false}
        />
      </div>
    );
  },
);

// TODO: use Mutation after removing redux

// <Mutation<removeWishlistProduct>
//   mutation={gql`
//     mutation removeWishlistProduct(
//       $input: RemoveWishlistProductInput!
//     ) {
//       removeWishlistProduct(input: $input) {
//         success
//         reason
//         productId
//       }
//     }
//   `}
//   update={(cache, { data }) => {
//     if (data?.removeWishlistProduct.success) {
//       const fragment = {
//         id: viewerId,
//         fragment: gql`
//           fragment memberWishListFragment on User {
//             wishlist {
//               id
//               productId
//             }
//           }
//         `,
//       };

//       const wishlistView = cache.readFragment<getWishlistViewer>(
//         fragment,
//       );
//       const wishlist = wishlistView?.wishlist;

//       if (!wishlist) return;

//       cache.writeFragment<getWishlistViewer>({
//         ...fragment,
//         data: {
//           __typename: "User",
//           wishlist: wishlist.filter(
//             wish =>
//               wish.productId !==
//               data?.removeWishlistProduct.productId,
//           ),
//         },
//       });

//       notification.success({ message: t('ok') });
//     } else {
//       notification.error({
//         message: t('error'),
//         description: data?.removeWishlistProduct.reason,
//       });
//     }
//   }}
//   onError={error => {
//     notification.error({
//       message: t('error'),
//       description: error,
//     });
//   }}
// >
//   {removeWishlistProductMutation => (
//     <Icon
//       type="close"
//       onClick={() =>
//         removeWishlistProductMutation({
//           variables: { input: { productId: value } },
//         })
//       }
//     />
//   )}
// </Mutation>
