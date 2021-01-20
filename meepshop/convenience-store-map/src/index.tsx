// typescript import
import { QueryResult } from '@apollo/react-common';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';
import { ApolloConsumer } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Modal, Tabs } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import AddressSelect from './AddressSelect';
import SearchInput from './SearchInput';
import StoreList from './StoreList';
import StoreDetail from './StoreDetail';
import styles from './styles/index.less';

// graphql typescript
import { getValidatedConvenienceStores } from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType
  extends I18nPropsType,
    Pick<QueryResult<getValidatedConvenienceStores>, 'client'> {
  shipmentType: string;
  storeTypes: string[];
  close: () => void;
  confirmStore: (store: {}) => void;
}

// definition
const { TabPane } = Tabs;

// definition
class ConvenienceStoreMap extends React.PureComponent<PropsType> {
  public state = {
    showStoreList: false,
    stores: [],
    store: {
      type: '',
      storeNumber: '',
      famiServiceNumber: '',
      name: '',
      address: '',
      phones: [],
      ecpayStoreNumber: '',
      ezshipStoreNumber: '',
    },
  };

  public filterConvenienceStores = async (input: {
    cityId: string;
    areaId: string;
    street: string;
    name: string;
    storeNumber: string;
  }): Promise<void> => {
    const { client, shipmentType, storeTypes } = this.props;

    const { data } = await client.query({
      query: gql`
        query getValidatedConvenienceStores(
          $input: ValidatedConvenienceStoreFilterInput!
        ) {
          validatedConvenienceStores(input: $input) {
            type
            storeNumber
            famiServiceNumber
            name
            address
            phones
            ecpayStoreNumber
            ezshipStoreNumber
          }
        }
      `,
      variables: { input: { ...input, shipmentType, storeTypes } },
      fetchPolicy: 'no-cache',
    });

    if (input.storeNumber) {
      this.setState({
        showStoreList: true,
        stores: data?.validatedConvenienceStores,
        store: data?.validatedConvenienceStores[0],
      });
    } else {
      this.setState({
        showStoreList: true,
        stores: data?.validatedConvenienceStores,
      });
    }
  };

  public selectStore = (store: {}): void => {
    this.setState({ store });
  };

  public reselectStore = (): void => {
    this.setState({ store: {} });
  };

  public cleanStores = (): void => {
    const { showStoreList } = this.state;

    if (showStoreList) {
      this.setState({
        showStoreList: false,
        stores: [],
        store: {
          type: '',
          storeNumber: '',
          famiServiceNumber: '',
          name: '',
          address: '',
          phones: [],
          ecpayStoreNumber: '',
          ezshipStoreNumber: '',
        },
      });
    }
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      shipmentType,
      storeTypes,
      close,
      confirmStore,
    } = this.props;
    const { showStoreList, stores, store } = this.state;

    return (
      <Modal
        wrapClassName={`${styles.modalWrap} ${
          store?.storeNumber ? styles.overflowHidden : ''
        }`}
        visible
        width="720px"
        title={t('chooseConvenienceStore')}
        onCancel={close}
        maskClosable={false}
        footer={null}
      >
        {/* fix ios body overflow: hidden bug */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: ${styles.screenSmMax}) {
                body { position: fixed; }
              }
            `,
          }}
        />
        <Tabs
          className={styles.tabs}
          size="small"
          defaultActiveKey="address"
          destroyInactiveTabPane
          onChange={this.cleanStores}
        >
          <TabPane tab={t('addressSearch')} key="address">
            <div>
              <AddressSelect
                shipmentType={shipmentType}
                storeTypes={storeTypes}
                filterConvenienceStores={this.filterConvenienceStores}
              />
              {!showStoreList ? null : (
                <StoreList
                  shipmentType={shipmentType}
                  stores={stores}
                  selectedStoreNumber={store?.storeNumber}
                  selectStore={this.selectStore}
                />
              )}
            </div>
            <StoreDetail
              shipmentType={shipmentType}
              store={store || {}}
              reselectStore={this.reselectStore}
              confirmStore={confirmStore}
            />
          </TabPane>
          <TabPane tab={t('nameSearch')} key="name">
            <div>
              <SearchInput
                searchKey="name"
                label={t('pleaseEnterName')}
                filterConvenienceStores={this.filterConvenienceStores}
              />
              {!showStoreList ? null : (
                <StoreList
                  shipmentType={shipmentType}
                  stores={stores}
                  selectedStoreNumber={store?.storeNumber}
                  selectStore={this.selectStore}
                />
              )}
            </div>
            <StoreDetail
              shipmentType={shipmentType}
              store={store || {}}
              reselectStore={this.reselectStore}
              confirmStore={confirmStore}
            />
          </TabPane>
          <TabPane tab={t('storeNumberSearch')} key="storeNumber">
            <div>
              <SearchInput
                searchKey="storeNumber"
                label={t('pleaseEnterStoreNumber')}
                filterConvenienceStores={this.filterConvenienceStores}
              />
              {!showStoreList || stores.length ? null : (
                <StoreList stores={stores} />
              )}
            </div>
            <StoreDetail
              shipmentType={shipmentType}
              store={store || {}}
              reselectStore={this.reselectStore}
              confirmStore={confirmStore}
            />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

const EnhancedConvenienceStoreMap = withTranslation('convenience-store-map')(
  ConvenienceStoreMap,
);

export default React.memo(
  ({
    shipmentType,
    storeTypes,
    close,
    confirmStore,
  }: Pick<PropsType, 'close' | 'confirmStore'> & {
    shipmentType: string;
    storeTypes: string[];
  }) => (
    <ApolloConsumer>
      {client => (
        <EnhancedConvenienceStoreMap
          client={client}
          shipmentType={shipmentType}
          storeTypes={storeTypes}
          close={close}
          confirmStore={confirmStore}
        />
      )}
    </ApolloConsumer>
  ),
);
