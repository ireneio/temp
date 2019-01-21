import React from 'react';
import PropType from 'prop-types';
import { gql } from 'apollo-boost';
import { Input } from 'antd';

import { contextProvider } from 'context';

import styles from './styles/replaceForm.less';
import * as LOCALE from './locale';

const { enhancer } = contextProvider('locale');

export const replaceFormFragment = gql`
  fragment replaceFormFragment on RecipientObjectType {
    name
    mobile
    address {
      streetAddress
    }
  }
`;

@enhancer
export default class ReplaceForm extends React.PureComponent {
  static propTypes = {
    recipient: PropType.shape({
      name: PropType.string.isRequired,
      mobile: PropType.string.isRequired,
      address: PropType.shape({
        streetAddress: PropType.string.isRequired,
      }).isRequired,
    }).isRequired,
    onChange: PropType.func.isRequired,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    name: this.props.recipient.name || '',
    // eslint-disable-next-line react/destructuring-assignment
    mobile: this.props.recipient.mobile || '',
    // eslint-disable-next-line react/destructuring-assignment
    address: this.props.recipient.address?.streetAddress || '',
  };

  componentDidMount() {
    this.onChange({});
  }

  componentDidUpdate(prevProps, prevState) {
    this.onChange(prevState);
  }

  onChange = prevState => {
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

  render() {
    const { transformLocale } = this.props;

    return (
      <div className={styles.root}>
        <h3>{transformLocale(LOCALE.RECIPIENT)}</h3>

        {[
          {
            key: 'name',
            placeholder: LOCALE.RECIPIENT_NAME,
          },
          {
            key: 'mobile',
            placeholder: LOCALE.RECIPIENT_MOBILE,
          },
          {
            key: 'address',
            placeholder: LOCALE.RECIPIENT_ADDRESS,
          },
        ].map(({ key, placeholder }) => (
          <Input
            key={key}
            placeholder={transformLocale(placeholder)}
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
