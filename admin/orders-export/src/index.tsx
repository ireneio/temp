// typescript import
import { QueryResult } from '@apollo/react-common';
import { DrawerProps } from 'antd/lib/drawer';

import { I18nPropsType } from '@admin/utils/lib/i18n';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import { Spin, Icon, Drawer, Select, Input, Button, Modal } from 'antd';
import idx from 'idx';

import { withTranslation } from '@admin/utils/lib/i18n';

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
    Pick<QueryResult<getExportFormat>, 'client'>,
    Omit<DrawerProps, 'closable' | 'title' | 'onClose'> {
  loading: boolean;
  exportFormatList: {
    id: string;
    name: string;
  }[];
  orderIds: string[];
  onClose?: () => void;
}

interface StateType extends Omit<orderExportDownload, 'orderIds'> {
  loadingExportDownloadUri: boolean;
}

// definition
const { Option } = Select;

class OrdersExport extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {
    maskId: null,
    fileType: null,
    fileName: null,
    loadingExportDownloadUri: false,
  };

  private getExportDownloadUri = (): void => {
    const {
      // HOC
      t,

      // props
      client,
      orderIds,
    } = this.props;
    const { maskId, fileType, fileName, loadingExportDownloadUri } = this.state;

    if (loadingExportDownloadUri) return;

    this.setState({ loadingExportDownloadUri: true }, async () => {
      const { data } = await client.query<
        getExportDownloadUri,
        getExportDownloadUriVariables
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
            orderIds,
            fileName,
          },
        },
      });

      const uri = idx(data, _ => _.getOrderExportDownload.uri);

      if (!uri) {
        this.setState({ loadingExportDownloadUri: false }, () =>
          Modal.error({
            title: t('error.title'),
            content: t('error.content'),
          }),
        );
        return;
      }

      const downloadLink = document.createElement('a');

      downloadLink.href = `/api/importExport/orders/${uri}`;
      downloadLink.click();

      this.setState({ loadingExportDownloadUri: false });
    });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      loading,
      className,
      exportFormatList,
      onClose,
      ...props
    } = this.props;
    const { maskId, fileType, loadingExportDownloadUri } = this.state;
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
              <Button onClick={onClose}>{t('go-back')}</Button>

              {!maskId || !fileType ? null : (
                <Button
                  loading={loadingExportDownloadUri}
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
        onClose={onClose}
        closable={false}
      >
        {loading ? (
          <Spin indicator={<Icon type="loading" spin />} />
        ) : (
          ['maskId', 'fileType', 'fileName'].map(key => (
            <div key={key} className={styles.content}>
              <span>{t(`${key}.title`)}</span>

              <span>
                {options[key] ? (
                  <Select
                    placeholder={t(`${key}.placeholder`)}
                    onChange={value =>
                      this.setState({ [key]: value } as Omit<
                        StateType,
                        'loadingExportDownloadUri'
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
                      this.setState({ [key]: value } as Omit<
                        StateType,
                        'loadingExportDownloadUri'
                      >)
                    }
                  />
                )}
              </span>
            </div>
          ))
        )}
      </Drawer>
    );
  }
}

const EnhancedOrdersExport = withTranslation('orders-export')(OrdersExport);

export default React.memo(
  ({
    visible,
    ...props
  }: Omit<DrawerProps, 'onClose'> & Pick<PropsType, 'onClose'>) => (
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

          selectedOrders @client {
            edges {
              node {
                id
              }
            }
          }
        }
      `}
      skip={!visible}
    >
      {({ loading, error, data, client }) => {
        const {
          getExportFormatList = null,
          getDefaultExportFormat = { data: [] },
          selectedOrders = null,
        } = data || {};
        const exportFormatList = [];

        // TODO: should not be null
        if (getDefaultExportFormat)
          exportFormatList.push(getDefaultExportFormat);

        return (
          <EnhancedOrdersExport
            {...props}
            loading={Boolean(loading || error || !data)}
            client={client}
            visible={visible}
            exportFormatList={
              [
                ...exportFormatList,
                // TODO: should not be null
                ...(idx(getExportFormatList, _ => _.data) || []).filter(
                  d => d !== null,
                ),
              ] as PropsType['exportFormatList']
            }
            orderIds={
              // TODO: should not be null
              !selectedOrders
                ? []
                : selectedOrders.edges.map(
                    ({ node: { id } }) => id || 'null-id',
                  )
            }
          />
        );
      }}
    </Query>
  ),
);
