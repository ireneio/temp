// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Input } from 'antd';
import idx from 'idx';

import { withTranslation } from '@store/utils/lib/i18n';

import styles from './styles/replaceForm.less';

// graphql import
import { RecipientCreateType } from '../../../__generated__/store';

// typescript definition
interface PropsType extends I18nPropsType {
  recipient?: RecipientCreateType;
  onChange: (value: RecipientCreateType) => void;
}

interface StateType {
  [key: string]: string;
}

// definition
export const formFragment = gql`
  fragment formFragment on RecipientObjectType {
    name
    mobile
    address {
      streetAddress
    }
  }
`;

class Form extends React.PureComponent<PropsType, StateType> {
  public state: StateType = {
    // eslint-disable-next-line react/destructuring-assignment
    name: idx(this, _ => _.props.recipient.name) || '',
    // eslint-disable-next-line react/destructuring-assignment
    mobile: idx(this, _ => _.props.recipient.mobile) || '',
    // eslint-disable-next-line react/destructuring-assignment
    address: idx(this, _ => _.props.recipient.address.streetAddress) || '',
  };

  public componentDidUpdate(_prevProps: PropsType, prevState: StateType): void {
    this.onChange(prevState);
  }

  private onChange = (prevState: StateType): void => {
    const { onChange } = this.props;
    const { name, mobile, address } = this.state;

    if (
      name !== prevState.name ||
      mobile !== prevState.mobile ||
      address !== prevState.address
    )
      onChange({
        name,
        mobile,
        address: {
          streetAddress: address,
        },
      });
  };

  public render(): React.ReactNode {
    const { t } = this.props;

    return (
      <div className={styles.root}>
        <h3>{t('recipient.title')}</h3>

        {[
          {
            key: 'name',
            placeholder: t('recipient.name'),
          },
          {
            key: 'mobile',
            placeholder: t('recipient.mobile'),
          },
          {
            key: 'address',
            placeholder: t('recipient.address'),
          },
        ].map(({ key, placeholder }) => (
          <Input
            key={key}
            placeholder={placeholder}
            value={
              this.state[key] // eslint-disable-line react/destructuring-assignment
            }
            onChange={({ target: { value: newValue } }) =>
              this.setState({ [key]: newValue })
            }
            size="large"
          />
        ))}
      </div>
    );
  }
}

export default withTranslation('member-order-apply')(Form);
