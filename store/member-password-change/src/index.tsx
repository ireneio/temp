// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationFunction } from '@apollo/react-common';
import { FormComponentProps } from 'antd/lib/form';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { ColorsType } from '@meepshop/context/lib/Colors';

// import
import React from 'react';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Form, Input, Button, notification } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import styles from './styles/index.less';

// graphql typescript
import {
  memberChangePassword,
  memberChangePasswordVariables,
} from './__generated__/memberChangePassword';

// typescript definition
interface PropsType extends I18nPropsType, FormComponentProps {
  colors: ColorsType;
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

class MemberPasswordChange extends React.PureComponent<PropsType> {
  private onSubmit = (
    memberChangePasswordMutation: MutationFunction<
      memberChangePassword,
      memberChangePasswordVariables
    >,
  ) => (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const {
      // props
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (err) return;

      const { currentPassword, newPassword } = values;

      memberChangePasswordMutation({
        variables: {
          input: {
            currentPassword,
            newPassword,
          },
        },
      });
    });
  };

  private updateMessage = (
    __: DataProxy,
    { data: { changeUserPassword } }: { data: memberChangePassword },
  ): void => {
    const {
      t,
      form: { resetFields },
    } = this.props;
    const status = changeUserPassword?.status; // SHOULD_NOT_BE_NULL

    if (status === 'OK') {
      notification.success({
        message: t('success'),
      });
      resetFields();
      return;
    }

    notification.error({
      message: t('error'),
    });
  };

  private confirmPassword = (
    _: unknown,
    value: string,
    callback: (message?: string) => void,
  ): void => {
    const {
      t,
      form: { getFieldValue },
    } = this.props;

    if (value && value !== getFieldValue('newPassword'))
      callback(t('form.password-not-match'));

    callback();
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,
      form: { getFieldDecorator, getFieldsError },

      // props
      colors,
    } = this.props;

    return (
      <Mutation<memberChangePassword, memberChangePasswordVariables>
        mutation={gql`
          mutation memberChangePassword($input: ChangeUserPasswordInput) {
            changeUserPassword(input: $input) {
              status
            }
          }
        `}
        update={this.updateMessage}
      >
        {memberChangePasswordMutation => (
          <Form
            className={styles.root}
            onSubmit={this.onSubmit(memberChangePasswordMutation)}
          >
            <FormItem>
              {getFieldDecorator('currentPassword', {
                rules: [
                  {
                    required: true,
                    message: t('form.required'),
                  },
                ],
              })(<Password size="large" placeholder={t('current-password')} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: t('form.required'),
                  },
                ],
              })(<Password size="large" placeholder={t('new-password')} />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator('confirmPassword', {
                rules: [
                  {
                    required: true,
                    message: t('form.required'),
                  },
                  {
                    validator: this.confirmPassword,
                  },
                ],
              })(<Password size="large" placeholder={t('confirm-password')} />)}
            </FormItem>

            <Button
              className={styles.button}
              style={{
                color: colors[3],
                borderColor: colors[3],
              }}
              disabled={(fieldsError =>
                Object.keys(fieldsError).some(field => fieldsError[field]))(
                getFieldsError(),
              )}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {t('submit')}
            </Button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default withTranslation('member-password-change')(
  Form.create<Omit<PropsType, 'colors'>>()(
    withContext(ColorsContext, colors => ({ colors }))(MemberPasswordChange),
  ),
);
