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
// TODO: remove after using real schema and remove in tsconfig
import { COUNTRIES } from '@store/apollo-client-resolvers/lib/constants';

import Form from './Form';
import styles from './styles/index.less';

// graphql typescript
import {
  getUserRecipients,
  getUserRecipients_viewer as getUserRecipientsViewer,
  getUserRecipients_viewer_recipientData as getUserRecipientsViewerRecipientData,
  getUserRecipients_getColorList as getUserRecipientsGetColorList,
} from './__generated__/getUserRecipients';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';

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
            postalCode,
            country,
            city,
            county,
            street,
          }: getUserRecipientsViewerRecipientData,
        ) =>
          [
            postalCode,
            !country
              ? null
              : (
                  COUNTRIES.find(({ name }) =>
                    Object.values(name).includes(country),
                  ) || {
                    name: {
                      /* eslint-disable @typescript-eslint/camelcase */
                      zh_TW: country,
                      en_US: country,
                      ja_JP: country,
                      vi_VN: country,
                      /* eslint-enable @typescript-eslint/camelcase */
                    },
                  }
                ).name[i18n.language],
            `${city || ''}${county || ''}${street || ''}`,
          ]
            .filter(text => text)
            .join(' '),
      },
      {
        title: t('mobile'),
        dataIndex: 'mobile',
      },
      {
        key: 'action',
        dataIndex: 'id',
        render: (value: getUserRecipientsViewerRecipientData['id']) => (
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
          value: getUserRecipientsViewerRecipientData['id'],
          {
            name,
            mobile,
            postalCode,
            country,
            city,
            county,
            street,
          }: getUserRecipientsViewerRecipientData,
        ) => (
          <div className={styles.mobile}>
            <span>{t('name')}</span>
            <span>{name}</span>

            <span>{t('address')}</span>
            <span>{`${postalCode || ''}${
              !country
                ? null
                : (
                    COUNTRIES.find(({ name: countryName }) =>
                      Object.values(countryName).includes(country),
                    ) || {
                      name: {
                        /* eslint-disable @typescript-eslint/camelcase */
                        zh_TW: country,
                        en_US: country,
                        ja_JP: country,
                        vi_VN: country,
                        /* eslint-enable @typescript-eslint/camelcase */
                      },
                    }
                  ).name[i18n.language] || ''
            }${city || ''}${county || ''}${street || ''}`}</span>

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

    if (!areEqual(member, prevProps.member)) refetch();
  }

  private edit = (id: getUserRecipientsViewerRecipientData['id']) => {
    this.setState({ selectId: id });
  };

  private remove = (id: getUserRecipientsViewerRecipientData['id']) => {
    const {
      viewer: { id: userId, recipientData },
      dispatchAction,
    } = this.props;
    /** TODO: should noe be null */
    const index = (recipientData || []).findIndex(
      data => idx(data, _ => _.id) === id,
    );

    if (!recipientData) return;

    // TODO: update apollo cache after removing redux
    dispatchAction('updateUser', {
      user: {
        id: userId,
        recipientData: {
          replaceData: ([
            ...recipientData.slice(0, index),
            ...recipientData.slice(index + 1, recipientData.length),
            /** TODO: should noe be null */
          ].filter(data => data) as getUserRecipientsViewerRecipientData[]).map(
            ({ name, mobile, postalCode, country, city, county, street }) => ({
              name,
              mobile,
              address: {
                postalCode,
                streetAddress: `${postalCode} ${country} ${city ||
                  ''}${county || ''}${street}`,
                yahooCode: {
                  country,
                  city,
                  county,
                  street,
                },
              },
            }),
          ),
        },
      },
    });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      i18n,

      // props
      viewer: { id, recipientData, store },
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
          rowKey={
            data =>
              idx(data, _ => _.id) || 'null-id' /** TODO: should noe be null */
          }
          columns={this.generateColumns({ t, i18n })}
          dataSource={
            (recipientData || []).filter(
              data => data,
            ) /** TODO: should not be null */
          }
          pagination={false}
        />

        <Form
          {
            ...(recipientData || []).find(
              data => idx(data, _ => _.id) === selectId,
            ) /** TODO: should noe be null */
          }
          colors={colors}
          lockedCountry={
            !lockedCountry
              ? null
              : /** TODO: should not be null in array */
                (lockedCountry.filter(text => text) as string[])
          }
          cancel={() => this.setState({ selectId: null })}
          userId={id}
          dispatchAction={dispatchAction}
          recipientData={recipientData}
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
            recipientData {
              id
              name
              mobile
              postalCode @client
              country @client
              city @client
              county @client
              street @client
              # for client
              address {
                postalCode
                yahooCode {
                  country
                  city
                  county
                  street
                }
              }
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
