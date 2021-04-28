// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form';

// import
import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import useMemberChangePassword from './hooks/useMemberChangePassword';
import useValidator from './hooks/useValidator';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  form?: FormComponentProps['form'];
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;
const { Password } = Input;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
const MemberPasswordChange: NextPage<PropsType> = Form.create<PropsType>()(
  React.memo(({ form }: FormComponentProps) => {
    const { getFieldDecorator, getFieldsError } = form;

    const { t } = useTranslation('member-password-change');
    const colors = useContext(ColorsContext);
    const memberChangePassword = useMemberChangePassword(form);
    const validateConfirmPassword = useValidator(form);

    return (
      <Form className={styles.root} onSubmit={memberChangePassword}>
        <FormItem>
          {getFieldDecorator('currentPassword', {
            rules: [
              {
                required: true,
                message: t('form.required'),
              },
            ],
            validateTrigger: 'onBlur',
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
            validateTrigger: 'onBlur',
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
                validator: validateConfirmPassword,
              },
            ],
            validateTrigger: 'onBlur',
            validateFirst: true,
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
    );
  }),
);

MemberPasswordChange.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default MemberPasswordChange;
