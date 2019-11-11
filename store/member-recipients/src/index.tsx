// typescript import
import { QueryResult } from 'react-apollo';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Spin, Icon, Table, Divider } from 'antd';
import { areEqual } from 'fbjs';
import idx from 'idx';
import memoizeOne from 'memoize-one';

import { withNamespaces } from '@store/utils/lib/i18n';

import Form from './Form';
import styles from './styles/index.less';

// graphql typescript
import {
  getUserRecipients,
  getUserRecipients_viewer as getUserRecipientsViewer,
  getUserRecipients_viewer_recipientAddressBook as getUserRecipientsViewerRecipientAddressBook,
  getUserRecipients_getColorList as getUserRecipientsGetColorList,
} from './__generated__/getUserRecipients';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';
import localeFragment from '@store/utils/lib/fragments/locale';

// typescript definition
interface PropsType
  extends I18nPropsType,
    // TODO: remove after removing redux
    Pick<QueryResult<getUserRecipients>, 'refetch'> {
  // TODO: remove after removing redux
  dispatchAction: (dispatchName: string, data: unknown) => void;
  // TODO: remove after removing redux
  member?: unknown;
  viewer: getUserRecipientsViewer;
  colors: getUserRecipientsGetColorList['colors'];
}

// definition
class MemberRecipients extends React.PureComponent<PropsType> {
  public state = {
    selectId: null,
  };

  private generateColumns = memoizeOne(
    ({ t, i18n }: Pick<PropsType, 't' | 'i18n'>) => [
      {
        title: t('name'),
        dataIndex: 'name',
      },
      {
        title: t('address'),
        dataIndex: 'address',
        render: (
          _: unknown,
          {
            country,
            city,
            area,
            zipCode,
            street,
          }: getUserRecipientsViewerRecipientAddressBook,
        ) =>
          [
            zipCode,
            !country ? null : country.name[i18n.language],
            `${!city ? '' : city.name[i18n.language]}${
              !area ? '' : area.name[i18n.language]
            }${street || ''}`,
          ]
            .filter(Boolean)
            .join(' '),
      },
      {
        title: t('mobile'),
        dataIndex: 'mobile',
      },
      {
        key: 'action',
        dataIndex: 'id',
        render: (value: getUserRecipientsViewerRecipientAddressBook['id']) => (
          <>
            <span className={styles.action} onClick={() => this.edit(value)}>
              {t('edit')}
            </span>

            <Divider type="vertical" />

            <span className={styles.action} onClick={() => this.remove(value)}>
              {t('remove')}
            </span>
          </>
        ),
      },
      {
        key: 'mobileStyle',
        dataIndex: 'id',
        render: (
          value: getUserRecipientsViewerRecipientAddressBook['id'],
          {
            name,
            mobile,
            zipCode,
            country,
            city,
            area,
            street,
          }: getUserRecipientsViewerRecipientAddressBook,
        ) => (
          <div className={styles.mobile}>
            <span>{t('name')}</span>
            <span>{name}</span>

            <span>{t('address')}</span>
            <span>{`${zipCode || ''}${
              !country ? '' : country.name[i18n.language]
            }${!city ? '' : city.name[i18n.language]}${
              !area ? '' : area.name[i18n.language]
            }${street || ''}`}</span>

            <span>{t('mobile')}</span>
            <span>{mobile}</span>

            <span />
            <div>
              <span className={styles.action} onClick={() => this.edit(value)}>
                {t('edit')}
              </span>

              <Divider type="vertical" />

              <span
                className={styles.action}
                onClick={() => this.remove(value)}
              >
                {t('remove')}
              </span>
            </div>
          </div>
        ),
      },
    ],
  );

  public componentDidUpdate(prevProps: PropsType): void {
    const { refetch, member } = this.props;

    if (!areEqual(member, prevProps.member))
      refetch().then(() => {
        this.setState({ selectId: null });
      });
  }

  private edit = (id: getUserRecipientsViewerRecipientAddressBook['id']) => {
    this.setState({ selectId: id });
  };

  private remove = (id: getUserRecipientsViewerRecipientAddressBook['id']) => {
    const {
      dispatchAction,
      viewer: { recipientAddressBook },
    } = this.props;

    // TODO: update apollo cache after removing redux
    dispatchAction('deleteRecipientAddress', {
      input: { id },
      recipientIndexForRedux: recipientAddressBook.findIndex(
        ({ id: recipientId }) => recipientId === id,
      ),
    });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      i18n,

      // props
      viewer: { recipientAddressBook, store },
      colors,
      dispatchAction,
    } = this.props;
    const { selectId } = this.state;

    // TODO: should not be null
    const { lockedCountry = null } = idx(store, _ => _.setting) || {};

    return (
      <div className={styles.root}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} .ant-table-tbody > tr:hover > td {
                background: ${colors[4]};
              }
            `,
          }}
        />

        <Table
          rowKey={({ id: recipientId }) => recipientId}
          columns={this.generateColumns({ t, i18n })}
          dataSource={recipientAddressBook}
          pagination={false}
        />

        <Form
          {...recipientAddressBook.find(
            ({ id: recipientId }) => recipientId === selectId,
          )}
          colors={colors}
          lockedCountry={
            !lockedCountry
              ? null
              : /** TODO: should not be null in array */
                (lockedCountry.filter(text => text) as string[])
          }
          cancel={() => this.setState({ selectId: null })}
          dispatchAction={dispatchAction}
          recipientIndexForRedux={recipientAddressBook.findIndex(
            ({ id: recipientId }) => recipientId === selectId,
          )}
        />
      </div>
    );
  }
}

const EnhancedMemberRecipients = withNamespaces('member-recipients')(
  MemberRecipients,
);

export default React.memo(
  ({
    dispatchAction,
    member,
  }: Pick<PropsType, 'dispatchAction' | 'member'>) => (
    <Query<getUserRecipients>
      query={gql`
        query getUserRecipients {
          viewer {
            id
            recipientAddressBook {
              id
              name
              mobile
              country {
                id
                name {
                  ...localeFragment
                }
              }
              city {
                id
                name {
                  ...localeFragment
                }
              }
              area {
                id
                name {
                  ...localeFragment
                }
              }
              zipCode
              street
            }

            store {
              id
              setting {
                lockedCountry
              }
            }
          }

          getColorList {
            ...colorListFragment
          }
        }

        ${colorListFragment}
        ${localeFragment}
      `}
    >
      {({ loading, error, data, refetch }) => {
        if (loading || error || !data)
          return <Spin indicator={<Icon type="loading" spin />} />;

        const { viewer, getColorList } = data;

        if (!viewer || !getColorList)
          return <Spin indicator={<Icon type="loading" spin />} />;

        return (
          <EnhancedMemberRecipients
            viewer={viewer}
            colors={getColorList.colors}
            refetch={refetch}
            dispatchAction={dispatchAction}
            member={member}
          />
        );
      }}
    </Query>
  ),
);
