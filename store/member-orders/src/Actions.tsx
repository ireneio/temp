// typescript import
import { DataProxy } from 'apollo-cache';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { message } from 'antd';
import Link from 'next/link';
import idx from 'idx';
import { areEqual } from 'fbjs';

import { withTranslation } from '@store/utils/lib/i18n';
import getLinkProps from '@store/utils/lib/getLinkProps';

import styles from './styles/actions.less';

// graphql typescript
import createOrderFragment from '@store/utils/lib/fragments/createOrder';

import { actionsOrderFragment as actionsOrderFragmentType } from './__generated__/actionsOrderFragment';
import { actionsStoreAppListFragment as actionsStoreAppListFragmentType } from './__generated__/actionsStoreAppListFragment';
import {
  payOrderAgain,
  payOrderAgainVariables,
  payOrderAgain_paymentAgainOrderList_formData as payOrderAgainPaymentAgainOrderListFormData,
} from './__generated__/payOrderAgain';

// typescript definition
interface PropsType extends I18nPropsType {
  order: actionsOrderFragmentType;
  appPlugins: actionsStoreAppListFragmentType;
}

interface StateType {
  formData: payOrderAgainPaymentAgainOrderListFormData | null;
}

// definition
export const actionsOrderFragment = gql`
  fragment actionsOrderFragment on Order {
    id
    status
    isAvailableForPayLater @client
    isAvailableForOrderApply @client
    isOrderApplied @client
    paymentInfo {
      status
      list {
        id
        template
        paymentId
      }
    }
    shipmentInfo {
      status
    }
  }
`;

export const actionsStoreAppListFragment = gql`
  fragment actionsStoreAppListFragment on StoreAppList {
    total # can not only have client side schema in the fragment
    isReturnOrderInstalled: isPluginInstalled(pluginName: "returnOrder") @client
    isReplacementInstalled: isPluginInstalled(pluginName: "replacement") @client
  }
`;

class Actions extends React.PureComponent<PropsType, StateType> {
  private formRef = React.createRef<HTMLFormElement>();

  public state = {
    formData: null,
  };

  public componentDidUpdate(_: PropsType, prevState: StateType): void {
    const { formData } = this.state;

    if (
      formData &&
      !areEqual(formData, prevState.formData) &&
      this.formRef.current
    )
      this.formRef.current.submit();
  }

  private payOrderAgainDone = (
    __: DataProxy,
    { data: { paymentAgainOrderList } }: { data: payOrderAgain },
  ): void => {
    const { t } = this.props;
    const formData = idx(paymentAgainOrderList, _ => _[0].formData);

    if (!formData || !formData.url) {
      message.error(t('pay-again.fail'));
      this.setState({ formData: null });
    } else {
      message.success(t('pay-again.success'));
      this.setState({ formData });
    }
  };

  public render(): React.ReactNode {
    const {
      t,
      order: {
        id,
        status,
        isAvailableForPayLater,
        isAvailableForOrderApply,
        isOrderApplied,
        paymentInfo,
        shipmentInfo,
      },
      appPlugins: { isReturnOrderInstalled, isReplacementInstalled },
    } = this.props;
    const { formData } = this.state;
    const isSkipOtherAction = ![0, 3].includes(status === null ? -1 : status); // TODO: should not be null
    const { url = '', params = {} } = formData || {
      url: undefined,
      params: undefined,
    };
    const formParams = Object.keys(params).reduce(
      (result, key: keyof typeof params) =>
        key === '__typename' || !params[key]
          ? result
          : [...result, [key, key === 'orderdesc' ? ' ' : params[key]]],
      [],
    );

    // TODO: should not be null
    const { template = null } = idx(paymentInfo, _ => _.list[0]) || {};

    return (
      <div className={styles.root}>
        {!url ? null : (
          <form
            ref={this.formRef}
            action={url}
            acceptCharset={/hitrust/.test(url) ? 'big5' : 'utf8'}
            method="POST"
          >
            {formParams.map(([key, value]) => (
              <input
                key={key}
                name={key}
                value={value}
                type="hidden"
                readOnly
              />
            ))}
          </form>
        )}

        {isSkipOtherAction ||
        !isAvailableForPayLater ||
        (paymentInfo || { status: -1 }).status !== 0 ? null : (
          <Mutation<payOrderAgain, payOrderAgainVariables>
            mutation={gql`
              mutation payOrderAgain(
                $paymentAgainOrderList: [PaymentAgainOrder]
              ) {
                paymentAgainOrderList(
                  paymentAgainOrderList: $paymentAgainOrderList
                ) {
                  ...createOrderFragment
                }
              }

              ${createOrderFragment}
            `}
            update={this.payOrderAgainDone}
          >
            {payOrderAgainMutation => (
              <div
                onClick={() =>
                  payOrderAgainMutation({
                    variables: {
                      paymentAgainOrderList: [
                        {
                          orderId: id || 'null-id', // TODO: should not be null
                          paymentId:
                            idx(paymentInfo, _ => _.list[0].paymentId) ||
                            'null-id', // TODO: should not be null
                        },
                      ],
                    },
                  })
                }
              >
                {t('pay-again.title')}
              </div>
            )}
          </Mutation>
        )}

        {isSkipOtherAction ||
        (shipmentInfo || { status: -1 }).status !== 3 ? null : (
          <>
            {!isOrderApplied ? null : (
              <Link {...getLinkProps(`/orderApplyList/${id}`)}>
                <a href={`/orderApplyList/${id}`}>{t('order.apply-list')}</a>
              </Link>
            )}

            {!isAvailableForOrderApply ? null : (
              <>
                {!isReturnOrderInstalled ? null : (
                  <Link {...getLinkProps(`/orderRefund/${id}`)}>
                    <a href={`/orderRefund/${id}`}>{t('order.return')}</a>
                  </Link>
                )}

                {!isReplacementInstalled ? null : (
                  <Link {...getLinkProps(`/orderExchange/${id}`)}>
                    <a href={`/orderExchange/${id}`}>{t('order.replace')}</a>
                  </Link>
                )}
              </>
            )}
          </>
        )}

        {isSkipOtherAction ||
        (paymentInfo || { status: -1 }).status === 2 ||
        template !== 'custom' ? null : (
          <Link {...getLinkProps(`/payNotify/${id}`)}>
            <a href={`/payNotify/${id}`}>{t('order.pay-notify')}</a>
          </Link>
        )}

        <Link {...getLinkProps(`/order/${id}#qa`)}>
          <a href={`/order/${id}#qa`}>{t('order.qa')}</a>
        </Link>
      </div>
    );
  }
}

export default withTranslation('member-orders')(Actions);
