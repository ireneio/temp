// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Spin, Input, Select, Checkbox, Button } from 'antd';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import AddressCascader, {
  validateAddressCascader,
} from '@meepshop/address-cascader';
import DatePicker from '@meepshop/date-picker';

import RemoveCreditCardInfo from './RemoveCreditCardInfo';
import useValidator from './hooks/useValidator';
import useUpdateUserSettings from './hooks/useUpdateUserSettings';
import styles from './styles/index.less';

// graphql typescript
import { getUserInfo as getUserInfoType } from '@meepshop/types/gqls/store';

// graphql import
import { getUserInfo } from './gqls';

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];

export default React.memo(() => {
  const { t } = useTranslation('member-settings');
  const colors = useContext(ColorsContext);
  const { data } = useQuery<getUserInfoType>(getUserInfo);
  const viewer = data?.viewer;
  const updateUserSettings = useUpdateUserSettings(viewer?.id || null);
  const validator = useValidator();

  if (!viewer) return <Spin indicator={<LoadingOutlined spin />} />;

  const {
    id,
    group,
    memberGroup,
    name,
    email,
    gender,
    birthday,
    notification,
    tel,
    mobile,
    address,
    store,
    hasGmoCreditCard,
  } = viewer;
  const {
    country = null,
    city = null,
    area = null,
    street = null,
    zipCode = null,
  } = address || {};
  const { startAt = new Date(), expireAt = new Date(), unlimitedDate = false } =
    group?.slice(-1)[0] || {};
  const { name: groupName = '', type = 'normal' } = memberGroup || {};
  const { lockedBirthday = null, rewardPointReminder } = store?.setting || {};
  const gmoRememberCardEnabled =
    store?.experiment?.gmoRememberCardEnabled || false;

  return (
    <div className={styles.root}>
      <div className={styles.groupName} style={{ color: colors[3] }}>
        {groupName}
      </div>

      {type === 'normal' ? null : (
        <div className={styles.groupExpireDate} style={{ color: colors[3] }}>
          {t('group-expire-date.info')}{' '}
          {format(new Date(startAt), 'yyyy/MM/dd')} ~{' '}
          {unlimitedDate
            ? t('group-expire-date.forever')
            : format(new Date(expireAt), 'yyyy/MM/dd')}
        </div>
      )}

      <Form
        className={styles.form}
        onFinish={updateUserSettings}
        scrollToFirstError
      >
        <div className={styles.nameAndGender}>
          <FormItem
            {...validator(name)}
            name={['name']}
            initialValue={name || undefined}
          >
            <Input size="large" placeholder={t('name')} />
          </FormItem>

          <FormItem
            {...validator(gender)}
            name={['gender']}
            initialValue={gender === null ? undefined : gender}
          >
            <Select
              size="large"
              placeholder={t('gender.placeholder')}
              allowClear
            >
              <Option value={0}>{t('gender.male')}</Option>
              <Option value={1}>{t('gender.female')}</Option>
            </Select>
          </FormItem>
        </div>

        <FormItem>
          <Input
            value={email as string /* SHOULD_NOT_BE_NULL */}
            size="large"
            placeholder={t('email')}
            disabled
          />
        </FormItem>

        <div className={styles.telAndMobile}>
          <FormItem
            {...validator(tel)}
            name={['additionalInfo', 'tel']}
            initialValue={tel || undefined}
          >
            <Input size="large" placeholder={t('tel')} />
          </FormItem>

          <FormItem
            {...validator(mobile)}
            name={['additionalInfo', 'mobile']}
            initialValue={mobile || undefined}
          >
            <Input size="large" placeholder={t('mobile')} />
          </FormItem>
        </div>

        <FormItem
          {...validator(birthday)}
          name={['birthday']}
          initialValue={
            // SHOULD_NOT_BE_NULL
            !birthday?.year || !birthday?.month || !birthday?.day
              ? undefined
              : new Date(birthday.year, birthday.month - 1, birthday.day)
          }
        >
          <DatePicker
            size="large"
            placeholder={t('birthday')}
            disabled={Boolean(birthday && lockedBirthday)}
          />
        </FormItem>

        <FormItem
          {...(country || city || area
            ? {
                rules: [
                  {
                    validator: validateAddressCascader(t('form.required')),
                  },
                ],
              }
            : {})}
          name={['addressAndZipCode']}
          initialValue={{
            address: ([country, city, area].filter(Boolean) as NonNullable<
              typeof country | typeof city | typeof area
            >[]).map(({ id: itemId }) => itemId),
            zipCode,
          }}
        >
          <AddressCascader
            className={styles.addressCascader}
            size="large"
            placeholder={[t('address'), t('zip-code')]}
            shippableCountries={store?.shippableCountries || []}
          />
        </FormItem>

        <FormItem
          {...validator(street)}
          name={['street']}
          initialValue={street || undefined}
        >
          <Input size="large" placeholder={t('street')} />
        </FormItem>

        <div className={styles.checkboxGroup}>
          <FormItem
            name={['isNotCancelNewslettersEmail']}
            initialValue={
              !notification?.newsletters?.cancelEmail /* SHOULD_NOT_BE_NULL */
            }
            valuePropName="checked"
            noStyle
          >
            <Checkbox>{t('newsletters')}</Checkbox>
          </FormItem>

          {!rewardPointReminder?.isEnabled ? null : (
            <FormItem
              name={['isNotCancelRewardPointReminderSubscriptionEmail']}
              initialValue={
                !notification?.rewardPointReminderSubscription
                  ?.cancelEmail /* SHOULD_NOT_BE_NULL */
              }
              valuePropName="checked"
              noStyle
            >
              <Checkbox>{t('rewardPointReminderSubscription')}</Checkbox>
            </FormItem>
          )}
        </div>

        <Button
          className={styles.submit}
          style={{ color: colors[3], borderColor: colors[3] }}
          size="large"
          type="primary"
          htmlType="submit"
        >
          {t('submit')}
        </Button>

        {!gmoRememberCardEnabled || !hasGmoCreditCard ? null : (
          <RemoveCreditCardInfo id={id} />
        )}
      </Form>
    </div>
  );
});
