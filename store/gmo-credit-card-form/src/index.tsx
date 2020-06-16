// typescript import
import { FormComponentProps } from 'antd/lib/form';
import { WithRouterProps } from 'next/dist/client/with-router';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import { Spin, Icon, Input, Checkbox } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import Form from './Form';
import styles from './styles/index.less';

// graphql typescript
import {
  getGMOUser,
  getGMOUserVariables,
  getGMOUser_gmoUser as getGMOUserGmoUser,
} from './__generated__/getGMOUser';

// typescript definition
export interface PropsType
  extends getGMOUserGmoUser,
    I18nPropsType,
    FormComponentProps {
  router: NonNullable<WithRouterProps['router']>;
  isInstallment: boolean;
  storePaymentId: string;
  gmoRememberCardEnabled: boolean;
}

// definition
class GmoCreditCardForm extends React.PureComponent<PropsType> {
  public state = {
    isModified:
      // eslint-disable-next-line react/destructuring-assignment
      this.props.exist && this.props.form.getFieldValue('changeCardNumber'),
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      router: { pathname },

      // props
      exist,
      cardNumberFront,
      cardNumberLater,
      isInstallment,
      storePaymentId,
      gmoRememberCardEnabled,
      form,
    } = this.props;
    const { isModified } = this.state;
    const { getFieldDecorator } = form;

    return (
      <>
        <h3 className={styles.title}>
          {t('title')}

          {!exist || isInstallment ? null : (
            <div
              className={styles.edit}
              onClick={() => this.setState({ isModified: !isModified })}
            >
              {isModified ? null : <Icon type="form" />}

              {t(isModified ? 'cancel' : 'modify')}
            </div>
          )}
        </h3>

        {getFieldDecorator('changeCardNumber', {
          // just use to record card changed, do not use in creating order.
          initialValue: Boolean(exist && isModified),
        })(<Input type="hidden" />)}

        {exist && !isModified && !isInstallment ? (
          <div className={styles.cardNumber}>
            {cardNumberFront}
            ********
            {cardNumberLater}
          </div>
        ) : (
          <Form
            isInstallment={isInstallment}
            storePaymentId={storePaymentId}
            form={form}
          />
        )}

        {isInstallment
          ? null
          : getFieldDecorator('isRememberCard', {
              valuePropName: 'checked',
              initialValue:
                !gmoRememberCardEnabled ||
                /** FIXME: should not need to check pathname after landingPage is rewritten by the new spec */
                pathname !== '/checkout' ||
                Boolean(exist && !isModified),
            })(
              <Checkbox
                className={
                  /** FIXME: should not need to check pathname after landingPage is rewritten by the new spec */
                  !gmoRememberCardEnabled || pathname !== '/checkout'
                    ? styles.hidden
                    : ''
                }
              >
                {t('remember-card')}
              </Checkbox>,
            )}
      </>
    );
  }
}

const EnhancedGmoCreditCardForm = withTranslation('gmo-credit-card-form')(
  withRouter(GmoCreditCardForm),
);

export default React.memo(
  ({
    storePaymentId,
    isInstallment,
    form,
  }: getGMOUserVariables & Pick<PropsType, 'isInstallment' | 'form'>) => (
    <Query<getGMOUser, getGMOUserVariables>
      query={gql`
        query getGMOUser($storePaymentId: ID!) {
          gmoUser: getGMOUser(getGMOUser: { storePaymentId: $storePaymentId }) {
            exist
            cardNumberFront
            cardNumberLater
          }

          viewer {
            id
            store {
              id
              experiment {
                gmoRememberCardEnabled
              }
            }
          }
        }
      `}
      /** FIXME: should remove cache in @store/member-settings, fix this after getGMOUser is rewritten */
      fetchPolicy="no-cache"
      variables={{ storePaymentId }}
    >
      {({ loading, error, data }) => {
        if (loading || error || !data)
          return <Spin indicator={<Icon type="loading" spin />} />;

        const { gmoUser, viewer } = data;
        const gmoRememberCardEnabled =
          viewer?.store?.experiment?.gmoRememberCardEnabled || false;

        return (
          <EnhancedGmoCreditCardForm
            {
              ...(gmoUser || {
                __typename: 'GMOUserInfo',
                exist: false,
                cardNumberFront: null,
                cardNumberLater: null,
              }) /** TODO: should not be null */
            }
            isInstallment={isInstallment}
            storePaymentId={storePaymentId}
            gmoRememberCardEnabled={gmoRememberCardEnabled}
            form={form}
          />
        );
      }}
    </Query>
  ),
);
