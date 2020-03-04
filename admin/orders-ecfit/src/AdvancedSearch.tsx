// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';

import { getEcfitListQueryPropsType } from './constants';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Popover, Select, Divider, Button } from 'antd';
import { areEqual } from 'fbjs';

import { withTranslation } from '@admin/utils/lib/i18n';

import { ADVANCED_SEARCH_ITEMS } from './constants';
import emptyArrayToUndefined from './utils/emptyArrayToUndefined';
import styles from './styles/advancedSearch.less';

// graphql typescript
import { localeFragmentType } from '@admin/utils/lib/fragments/locale';

import { advancedSearchStorePaymentFragment as advancedSearchStorePaymentFragmentType } from './__generated__/advancedSearchStorePaymentFragment';
import { advancedSearchStoreShipmentFragment as advancedSearchStoreShipmentFragmentType } from './__generated__/advancedSearchStoreShipmentFragment';

// graphql import
import localeFragment from '@admin/utils/lib/fragments/locale';

// typescript definition
interface PropsType
  extends I18nPropsType,
    Pick<getEcfitListQueryPropsType, 'variables' | 'refetch'> {
  rootRef: React.RefObject<HTMLDivElement>;
  storePayments: advancedSearchStorePaymentFragmentType[];
  storeShipments: advancedSearchStoreShipmentFragmentType[];
}

interface StateType {
  isVisible: boolean;
  filter: PropsType['variables']['filter'];
}

// definition
const { Option } = Select;

export const advancedSearchStorePaymentFragment = gql`
  fragment advancedSearchStorePaymentFragment on StorePayment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

export const advancedSearchStoreShipmentFragment = gql`
  fragment advancedSearchStoreShipmentFragment on StoreShipment {
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

class AdvancedSearch extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {
    isVisible: false,
    // eslint-disable-next-line react/destructuring-assignment
    filter: this.props.variables.filter,
  };

  private getOptions = (
    optionsKey: keyof StateType['filter'],
    options: string[],
  ): React.ReactNode => {
    const {
      // HOC
      t,
      i18n,

      // props
      storePayments,
      storeShipments,
    } = this.props;

    switch (optionsKey) {
      case 'paymentIdList':
      case 'shipmentIdList':
        return ({
          paymentIdList: storePayments,
          shipmentIdList: storeShipments,
        }[optionsKey] as {
          id: string;
          title: localeFragmentType;
        }[]).map(({ id, title }) => (
          <Option key={id} value={id}>
            {title[i18n.language] || title.zh_TW}
          </Option>
        ));

      default:
        return options.map(key => (
          <Option key={key} value={key}>
            {t(`${optionsKey}.${key}`)}
          </Option>
        ));
    }
  };

  private search = (): void => {
    const { variables, refetch } = this.props;
    const { isVisible, filter } = this.state;

    if (isVisible || areEqual(filter, variables.filter)) return;

    refetch({
      ...variables,
      filter: {
        ...filter,
        timeRange: variables?.filter?.timeRange,
        searchTerm: variables?.filter?.searchTerm,
        ecfitSentStatus: variables?.filter?.ecfitSentStatus,
      },
    });
  };

  private visibleChange = (visible: boolean): void => {
    if (!visible) {
      this.setState({ isVisible: visible }, this.search);
      return;
    }

    const {
      variables: { filter },
    } = this.props;

    this.setState({ isVisible: visible, filter });
  };

  public render(): React.ReactNode {
    const { t, rootRef } = this.props;
    const { isVisible, filter } = this.state;

    return (
      <Popover
        overlayClassName={styles.root}
        visible={isVisible}
        content={
          <>
            {ADVANCED_SEARCH_ITEMS.map(({ optionsKey, options }, index) =>
              optionsKey === 'divider' ? (
                // eslint-disable-next-line react/no-array-index-key
                <Divider key={`${optionsKey}-${index}`} />
              ) : (
                <div key={optionsKey} className={styles.item}>
                  <span className={styles.title}>
                    {t(`advanced-search.${optionsKey}-title`)}
                  </span>

                  <Select
                    value={(filter?.[optionsKey] || []) as string[]}
                    onChange={(value?: string[]) =>
                      this.setState({
                        filter: {
                          ...filter,
                          [optionsKey]: emptyArrayToUndefined(value || []),
                        },
                      })
                    }
                    placeholder={`${t('advanced-search.pre-placeholder')}${t(
                      `advanced-search.${optionsKey}-title`,
                    )}`}
                    mode="multiple"
                  >
                    {this.getOptions(
                      optionsKey as keyof StateType['filter'],
                      options || [],
                    )}
                  </Select>
                </div>
              ),
            )}

            <div className={styles.buttons}>
              <span onClick={() => this.setState({ filter: null })}>
                {t('advanced-search.reset')}
              </span>

              <Button
                type="primary"
                onClick={() => this.setState({ isVisible: false }, this.search)}
              >
                {t('advanced-search.filter')}
              </Button>
            </div>
          </>
        }
        onVisibleChange={this.visibleChange}
        placement="bottomLeft"
        trigger="click"
        getPopupContainer={() => rootRef.current || document.body}
      >
        <span>
          <Select value={t('filter.advanced-search')} open={false}>
            <Option value={t('filter.advanced-search')}>
              {t('filter.advanced-search')}
            </Option>
          </Select>
        </span>
      </Popover>
    );
  }
}

export default withTranslation('orders-ecfit')(AdvancedSearch);
