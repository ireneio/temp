// typescript import
import { QueryResult } from 'react-apollo';
import { DataProxy } from 'apollo-cache';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { Button, notification } from 'antd';
import idx from 'idx';

import { withNamespaces } from '@store/utils/lib/i18n';

import styles from './styles/removeCreditCardInfo.less';

// graphql typescript
import {
  getUserInfo,
  getUserInfo_getColorList as getUserInfoGetColorList,
} from './__generated__/getUserInfo';
import { removeCreditCardInfoFragment as removeCreditCardInfoFragmentType } from './__generated__/removeCreditCardInfoFragment';
import { removeCreditCard } from './__generated__/removeCreditCard';

// typescript definition
interface PropsType
  extends I18nPropsType,
    /** FIXME: should update hasGmoCreditCard in cache after creating order */
    Pick<QueryResult<getUserInfo>, 'refetch'> {
  viewer: removeCreditCardInfoFragmentType;
  colors: getUserInfoGetColorList['colors'];
}

// definition
export const removeCreditCardInfoFragment = gql`
  fragment removeCreditCardInfoFragment on User {
    id
    hasGmoCreditCard
  }
`;

class RemoveCreditCardInfo extends React.PureComponent<PropsType> {
  private removeGmoCreditCardDone = (
    cache: DataProxy,
    { data: { removeGmoCreditCard } }: { data: removeCreditCard },
  ) => {
    const {
      // HOC
      t,

      // props
      viewer,
      refetch,
    } = this.props;
    const status = idx(removeGmoCreditCard, _ => _.status);
    const id = idx(viewer, _ => _.id);

    if (status !== 'SUCCESS' || !id) {
      notification.error({
        message: t('remove-credit-card-info.fail'),
      });
      return;
    }

    notification.success({
      message: t('remove-credit-card-info.success'),
    });
    cache.writeFragment({
      id,
      fragment: removeCreditCardInfoFragment,
      data: {
        __typename: 'User',
        id,
        hasGmoCreditCard: false,
      },
    });

    /** FIXME: should update hasGmoCreditCard in cache after creating order */
    refetch();
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      colors,
    } = this.props;

    return (
      <>
        <div className={styles.divider} style={{ background: colors[5] }} />

        <div className={styles.title} style={{ color: colors[3] }}>
          {t('remove-credit-card-info.title')}
        </div>
        <div className={styles.subTitle} style={{ color: colors[3] }}>
          {t('remove-credit-card-info.subTitle')}
        </div>

        <Mutation<removeCreditCard>
          mutation={gql`
            mutation removeCreditCard {
              removeGmoCreditCard {
                status
              }
            }
          `}
          update={this.removeGmoCreditCardDone}
        >
          {removeGmoCreditCardMutation => (
            <Button
              className={styles.submit}
              style={{ color: colors[3], borderColor: colors[3] }}
              onClick={() => removeGmoCreditCardMutation()}
              size="large"
              type="primary"
            >
              {t('remove-credit-card-info.submit')}
            </Button>
          )}
        </Mutation>
      </>
    );
  }
}

export default withNamespaces('member-settings')(RemoveCreditCardInfo);
