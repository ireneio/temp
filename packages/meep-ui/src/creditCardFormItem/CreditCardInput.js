import React from 'react';
import PropTypes from 'prop-types';
import { BACKSPACE } from 'fbjs/lib/Keys';
import Input from 'antd/lib/input';

import * as styles from './styles/creditCardInput';

export default class CreditCardInput extends React.PureComponent {
  creditCardInputRef = React.createRef();

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.string.isRequired), // eslint-disable-line react/require-default-props
  };

  static defaultProps = {
    onChange: () => {},
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    value: this.props.value || ['', '', '', ''],
  };

  onChange = index => ({ target }) => {
    const { onChange } = this.props;
    const { value: prevValue } = this.state;
    const value = [...prevValue];
    const { value: inputValue } = target;

    value[index] = inputValue;

    onChange(value);
    this.setState({ value });
  };

  onKeyDown = index => ({ target, keyCode }) => {
    const { value } = target;
    const nextIndex = this.findEmptyInputIndex(0);

    switch (keyCode) {
      case BACKSPACE:
        if (index > 0 && value.length === 0) {
          this.creditCardInputRef.current.childNodes[
            !nextIndex || nextIndex >= index ? index - 1 : nextIndex
          ].focus();
        }
        break;

      default:
        if (index < 3 && value.length === 4) {
          this.creditCardInputRef.current.childNodes[
            !nextIndex || nextIndex <= index ? index + 1 : nextIndex
          ].focus();
        }
        break;
    }
  };

  findEmptyInputIndex = index => {
    const { value } = this.state;

    if (value[index] === '') return index;

    if (index > 3) return false;

    return this.findEmptyInputIndex(index + 1);
  };

  render() {
    const { value } = this.state;

    return (
      <div ref={this.creditCardInputRef} style={styles.root}>
        {value.map((inputValue, index) => (
          /* eslint-disable react/no-array-index-key */
          <Input
            key={index}
            style={styles.input(index)}
            maxLength={4}
            value={inputValue}
            onChange={this.onChange(index)}
            onKeyDown={this.onKeyDown(index)}
          />
          /* eslint-enable react/no-array-index-key */
        ))}
      </div>
    );
  }
}
