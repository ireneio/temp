// typescript import
import { QueryResult } from '@apollo/react-common';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { ColorsType } from '@meepshop/context/lib/Colors';

// import
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Table } from 'antd';
import { areEqual } from 'fbjs';
import memoizeOne from 'memoize-one';
import moment from 'moment';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';
import Thumbnail, { thumbnailFragment } from '@meepshop/thumbnail';
import withContext from '@store/utils/lib/withContext';

import styles from './styles/index.less';

// graphql typescript
import {
  getWishlist,
  getWishlist_viewer_wishlist as getWishlistViewerWishlist,
  getWishlist_viewer_wishlist_title as getWishlistViewerWishlistTitle,
} from './__generated__/getWishlist';

// typescript definition
interface PropsType
  extends I18nPropsType,
    // TODO: remove after removing redux
    Pick<QueryResult<getWishlist>, 'refetch'> {
  viewerId: string;
  wishlist: getWishlistViewerWishlist[];
  colors: ColorsType;

  // TODO: remove after removing redux
  wishListFromRedux?: unknown;
  dispatchAction: (dispatchName: string, data: unknown) => void;
}

// definition
class MemberWishList extends React.PureComponent<PropsType> {
  private columns = memoizeOne(
    ({ t, dispatchAction }: Pick<PropsType, 't' | 'dispatchAction'>) => [
      {
        dataIndex: 'coverImage',
        render: (
          value: getWishlistViewerWishlist['coverImage'],
          { productId, isAvailableForSale }: getWishlistViewerWishlist,
        ) =>
          !isAvailableForSale ? (
            <Thumbnail image={filter(thumbnailFragment, value)} />
          ) : (
            <a
              href={`/product/${productId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Thumbnail image={filter(thumbnailFragment, value)} />
            </a>
          ),
      },
      {
        dataIndex: 'title.zh_TW',
        title: t('productTitle'),
        render: (
          value: getWishlistViewerWishlistTitle['zh_TW'],
          { productId, isAvailableForSale }: getWishlistViewerWishlist,
        ) =>
          !isAvailableForSale ? (
            <span className={styles.notAvailableForSale}>
              {t('notAvailableForSale')}
            </span>
          ) : (
            <a
              className={styles.link}
              href={`/product/${productId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          ),
      },
      {
        dataIndex: 'createdAt',
        title: t('addDate'),
        className: styles.addDate,
        render: (
          value: getWishlistViewerWishlist['createdAt'],
          { isAvailableForSale }: getWishlistViewerWishlist,
        ) => (
          <span style={{ opacity: isAvailableForSale ? 1 : 0.5 }}>
            {isAvailableForSale ? moment.unix(value).format('YYYY/MM/DD') : '-'}
          </span>
        ),
      },
      {
        dataIndex: 'productId',
        title: t('cancel'),
        className: styles.icon,
        render: (value: getWishlistViewerWishlist['productId']) => (
          <Icon
            type="close"
            onClick={() => dispatchAction('updateWishList', { remove: value })}
          />
        ),
      },
    ],
  );

  // TODO: remove after removing redux
  public componentDidUpdate(prevProps: PropsType): void {
    const { refetch, wishListFromRedux } = this.props;

    if (!areEqual(wishListFromRedux, prevProps.wishListFromRedux)) refetch();
  }

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      wishlist,
      colors,
      dispatchAction,
    } = this.props;

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
          columns={this.columns({ t, dispatchAction })}
          dataSource={wishlist}
          pagination={false}
        />
      </div>
    );
  }
}

const EnhancedMemberWishList = withTranslation('member-wish-list')(
  withContext(ColorsContext, colors => ({
    colors,
  }))(MemberWishList),
);

export default React.memo(
  ({
    dispatchAction,
    wishListFromRedux,
  }: Pick<PropsType, 'dispatchAction' | 'wishListFromRedux'>) => (
    <Query<getWishlist>
      query={gql`
        query getWishlist {
          viewer {
            id
            wishlist {
              id
              productId
              createdAt
              title {
                zh_TW
              }
              coverImage {
                ...thumbnailFragment
              }
              isAvailableForSale
            }
          }
        }

        ${thumbnailFragment}
      `}
      fetchPolicy="no-cache"
    >
      {({ loading, error, data, refetch }) => {
        if (loading || error || !data)
          return <Spin indicator={<Icon type="loading" spin />} />;

        const { viewer } = data;
        // SHOULD_NOT_BE_NULL
        const id = viewer?.id || 'null id';
        const wishlist = viewer?.wishlist;

        if (!wishlist) return <Spin indicator={<Icon type="loading" spin />} />;

        return (
          <EnhancedMemberWishList
            viewerId={id}
            wishlist={
              wishlist.filter(
                Boolean,
              ) as PropsType['wishlist'] /** SHOULD_NOT_BE_NULL */
            }
            refetch={refetch}
            dispatchAction={dispatchAction}
            wishListFromRedux={wishListFromRedux}
          />
        );
      }}
    </Query>
  ),
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
