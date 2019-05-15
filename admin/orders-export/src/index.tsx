// typescript import
import { QueryResult } from 'react-apollo';
import { DrawerProps } from 'antd/lib/drawer';

import { I18nPropsType } from '@admin/utils/lib/i18n';
import { OmitType } from '@admin/utils/lib/types';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Spin, Icon, Drawer, Select, Input, Button, Modal } from 'antd';
import idx from 'idx';

import { withNamespaces } from '@admin/utils/lib/i18n';

import { TYPE_LIST } from './constants';
import styles from './styles/index.less';

// graphql typescript
import { getExportFormat } from './__generated__/getExportFormat';
import {
  getExportDownloadUri,
  getExportDownloadUriVariables,
} from './__generated__/getExportDownloadUri';
import { orderExportDownload } from '../../../__generated__/admin';

// typescript definition
interface PropsType
  extends I18nPropsType,
    Pick<QueryResult<getExportFormat>, 'fetchMore'>,
    OmitType<DrawerProps, 'closable' | 'title'> {
  exportFormatList: {
    id: string;
    name: string;
  }[];
  goBack: () => void;
}

interface StateType extends OmitType<orderExportDownload, 'orderIds'> {
  loading: boolean;
}

// definition
const { Option } = Select;

class OrdersExport extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {
    maskId: null,
    fileType: null,
    fileName: null,
    loading: false,
  };

  private getExportDownloadUri = () => {
    const {
      // HOC
      t,

      // props
      fetchMore,
    } = this.props;
    const { maskId, fileType, fileName, loading } = this.state;

    if (loading) return;

    this.setState({ loading: true }, () =>
      fetchMore<
        getExportDownloadUri,
        getExportDownloadUriVariables,
        keyof getExportDownloadUriVariables
      >({
        query: gql`
          query getExportDownloadUri($ids: orderExportDownload) {
            getOrderExportDownload(ids: $ids) {
              uri
            }
          }
        `,
        variables: {
          ids: {
            maskId,
            fileType,
            orderIds: [], // TODO: use selectedOrders
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const uri = idx(fetchMoreResult, _ => _.getOrderExportDownload.uri);

          if (!uri) {
            this.setState({ loading: false }, () =>
              Modal.error({
                title: t('error.title'),
                content: t('error.content'),
              }),
            );
            return previousResult;
          }

          // TODO: should remove setTimeout
          setTimeout(() => {
            const downloadLink = document.createElement('a');

            downloadLink.href = `/api/importExport/orders/${uri}`;
            downloadLink.download = `${fileName ||
              new Date().getTime()}.${fileType}`;
            downloadLink.click();

            this.setState({ loading: false });
          }, 2000);

          return previousResult;
        },
      }),
    );
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      className,
      exportFormatList,
      goBack,
      ...props
    } = this.props;
    const { maskId, fileType, loading } = this.state;
    const options: {
      [key: string]: PropsType['exportFormatList'];
    } = {
      maskId: exportFormatList,
      fileType: TYPE_LIST,
    };

    return (
      <Drawer
        {...props}
        title={
          <div className={styles.title}>
            <span>{t('title')}</span>

            <span>
              <Button onClick={goBack}>{t('go-back')}</Button>

              {!maskId || !fileType ? null : (
                <Button
                  loading={loading}
                  onClick={this.getExportDownloadUri}
                  type="primary"
                >
                  {t('download')}
                </Button>
              )}
            </span>
          </div>
        }
        className={`${styles.root} ${className}`}
        closable={false}
      >
        {['maskId', 'fileType', 'fileName'].map(key => (
          <div key={key} className={styles.content}>
            <span>{t(`${key}.title`)}</span>

            <span>
              {options[key] ? (
                <Select
                  placeholder={t(`${key}.placeholder`)}
                  onChange={value =>
                    this.setState({ [key]: value } as OmitType<
                      StateType,
                      'loading'
                    >)
                  }
                >
                  {options[key].map(({ id, name }) => (
                    <Option key={id}>{name}</Option>
                  ))}
                </Select>
              ) : (
                <Input
                  placeholder={t(`${key}.placeholder`)}
                  onChange={({ target: { value } }) =>
                    this.setState({ [key]: value } as OmitType<
                      StateType,
                      'loading'
                    >)
                  }
                />
              )}
            </span>
          </div>
        ))}
      </Drawer>
    );
  }
}

const EnhancedOrdersExport = withNamespaces('orders-export')(OrdersExport);

export default React.memo(
  ({ visible, ...props }: OmitType<PropsType, keyof I18nPropsType>) => (
    <Query<getExportFormat>
      query={gql`
        query getExportFormat {
          getExportFormatList(
            search: {
              filter: {
                or: [
                  { type: "exact", field: "type", query: "order_custom" }
                  {
                    type: "exact"
                    field: "type"
                    query: "order_system_default"
                  }
                ]
              }
            }
          ) {
            data {
              id
              name
            }
          }

          getDefaultExportFormat(type: order_default) {
            id
            name
          }
        }
      `}
      skip={!visible}
    >
      {({ loading, error, data, fetchMore }) => {
        if (loading || error || !data)
          return <Spin indicator={<Icon type="loading" spin />} />;

        const { getExportFormatList, getDefaultExportFormat } = data;
        const exportFormatList = [];

        // TODO: should not be null
        if (getDefaultExportFormat)
          exportFormatList.push(getDefaultExportFormat);

        return (
          <EnhancedOrdersExport
            {...props}
            visible={visible}
            fetchMore={fetchMore}
            exportFormatList={
              [
                ...exportFormatList,
                // TODO: should not be null
                ...(idx(getExportFormatList, _ => _.data) || []).filter(
                  d => d !== null,
                ),
              ] as PropsType['exportFormatList']
            }
          />
        );
      }}
    </Query>
  ),
);
