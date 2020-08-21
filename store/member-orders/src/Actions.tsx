// typescript import
import { DataProxy } from 'apollo-cache';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { AppsType } from '@meepshop/context/lib/Apps';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { message } from 'antd';
import { areEqual } from 'fbjs';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { Apps as AppsContext } from '@meepshop/context';
import Link from '@meepshop/link';
import withContext from '@store/utils/lib/withContext';

import styles from './styles/actions.less';

// graphql typescript
import { actionsFragment as actionsFragmentType } from './__generated__/actionsFragment';
import {
  payOrderAgain,
  payOrderAgainVariables,
  payOrderAgain_paymentAgainOrderList_formData as payOrderAgainPaymentAgainOrderListFormData,
} from './__generated__/payOrderAgain';

// graphql import
import createOrderFragment from '@meepshop/utils/lib/fragments/createOrder';

// typescript definition
interface PropsType extends I18nPropsType {
  apps: AppsType;
  order: actionsFragmentType;
}

interface StateType {
  formData: payOrderAgainPaymentAgainOrderListFormData | null;
}

// definition
export const actionsFragment = gql`
  fragment actionsFragment on Order {
    id
    status
    isAvailableForPayLater @client
    isAvailableForOrderApply @client
    isOrderApplied @client
    choosePayLaterWhenPlaced
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
    const formData = paymentAgainOrderList?.[0]?.formData;

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
      apps,
      order: {
        id,
        status,
        isAvailableForPayLater,
        isAvailableForOrderApply,
        isOrderApplied,
        paymentInfo,
        shipmentInfo,
        choosePayLaterWhenPlaced,
      },
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
    const template = paymentInfo?.list?.[0]?.template;

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

        {!choosePayLaterWhenPlaced ||
        isSkipOtherAction ||
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
                  id
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
                            paymentInfo?.list?.[0]?.paymentId || 'null-id', // TODO: should not be null
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

        {!isOrderApplied ? null : (
          <Link href={`/orderApplyList/${id}`}>
            <a href={`/orderApplyList/${id}`}>{t('order.apply-list')}</a>
          </Link>
        )}

        {isSkipOtherAction ||
        (shipmentInfo || { status: -1 }).status !== 3 ? null : (
          <>
            {!isAvailableForOrderApply ? null : (
              <>
                {!apps.returnOrder.isInstalled ? null : (
                  <Link href={`/orderRefund/${id}`}>
                    <a href={`/orderRefund/${id}`}>{t('order.return')}</a>
                  </Link>
                )}

                {!apps.replacement.isInstalled ? null : (
                  <Link href={`/orderExchange/${id}`}>
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
          <Link href={`/payNotify/${id}`}>
            <a href={`/payNotify/${id}`}>{t('order.pay-notify')}</a>
          </Link>
        )}

        <Link href={`/order/${id}#qa`}>
          <a href={`/order/${id}#qa`}>{t('order.qa')}</a>
        </Link>
      </div>
    );
  }
}

export default withTranslation('member-orders')(
  withContext(AppsContext, apps => ({ apps }))(Actions),
);
