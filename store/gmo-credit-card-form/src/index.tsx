// typescript import
import { FormComponentProps } from 'antd/lib/form';

import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Spin, Icon } from 'antd';

import { withNamespaces } from '@store/utils/lib/i18n';

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
  isInstallment: boolean;
  storePaymentId: string;
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

      // props
      exist,
      cardNumberFront,
      cardNumberLater,
      isInstallment,
      storePaymentId,
      form,
    } = this.props;
    const { isModified } = this.state;
    const { getFieldDecorator } = form;

    return (
      <>
        <h3 className={styles.title}>
          {t('title')}

          {!exist ? null : (
            <div
              className={styles.edit}
              onClick={() => this.setState({ isModified: !isModified })}
            >
              {isModified ? null : <Icon type="form" />}

              {t(isModified ? 'cancel' : 'modify')}
            </div>
          )}
        </h3>

        {getFieldDecorator('isRegistered', {
          initialValue: exist,
        })(<input type="hidden" />)}

        {getFieldDecorator('changeCardNumber', {
          initialValue: exist && isModified,
        })(<input type="hidden" />)}

        {exist && !isModified ? (
          <div>
            {cardNumberFront}
            ********
            {cardNumberLater}
          </div>
        ) : (
          <Form
            exist={Boolean(exist) /** TODO should not be null */}
            isInstallment={isInstallment}
            storePaymentId={storePaymentId}
            form={form}
          />
        )}
      </>
    );
  }
}

const EnhancedGmoCreditCardForm = withNamespaces('gmo-credit-card-form')(
  GmoCreditCardForm,
);

export default React.forwardRef(
  (
    {
      storePaymentId,
      isInstallment,
      form,
    }: getGMOUserVariables & Pick<PropsType, 'isInstallment' | 'form'>,
    ref: React.Ref<Query<getGMOUser, getGMOUserVariables>>,
  ) => (
    <Query<getGMOUser, getGMOUserVariables>
      ref={ref}
      query={gql`
        query getGMOUser($storePaymentId: ID!) {
          gmoUser: getGMOUser(getGMOUser: { storePaymentId: $storePaymentId }) {
            exist
            cardNumberFront
            cardNumberLater
          }
        }
      `}
      variables={{ storePaymentId }}
    >
      {({ loading, error, data }) => {
        if (loading || error || !data)
          return <Spin indicator={<Icon type="loading" spin />} />;

        const { gmoUser } = data;

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
            form={form}
          />
        );
      }}
    </Query>
  ),
);
