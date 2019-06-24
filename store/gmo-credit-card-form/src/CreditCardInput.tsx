// import
import React from 'react';
import { Input } from 'antd';
import { Keys } from 'fbjs';

import styles from './styles/creditCardInput.less';

// definition
const { BACKSPACE } = Keys;
const DEFAULT_VALUE = ['', '', '', ''];

export default class CreditCardInput extends React.PureComponent<{
  value?: string[];
  onChange?: (value: string[]) => void;
}> {
  private creditCardInputRef = React.createRef<
    HTMLDivElement & { childNodes: HTMLInputElement[] }
  >();

  private changeValue = (index: number) => ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value: prevValue, onChange } = this.props;
    const newValue = [...(prevValue || DEFAULT_VALUE)];

    newValue[index] = value;

    if (onChange) onChange(newValue);
  };

  private keyDown = (index: number) => ({
    currentTarget: { value },
    keyCode,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    const nextIndex = this.findEmptyInputIndex(0);
    const creditCardInput = this.creditCardInputRef.current;

    if (!creditCardInput) return;

    switch (keyCode) {
      case BACKSPACE:
        if (index > 0 && value.length === 0)
          creditCardInput.childNodes[
            !nextIndex || nextIndex >= index ? index - 1 : nextIndex
          ].focus();
        break;

      default: {
        if (index < 3 && value.length === 4)
          creditCardInput.childNodes[
            !nextIndex || nextIndex <= index ? index + 1 : nextIndex
          ].focus();
        break;
      }
    }
  };

  private findEmptyInputIndex = (index: number): number | false => {
    const { value } = this.props;

    if ((value || DEFAULT_VALUE)[index] === '') return index;

    if (index > 3) return false;

    return this.findEmptyInputIndex(index + 1);
  };

  public render(): React.ReactNode {
    const { value } = this.props;

    return (
      <div ref={this.creditCardInputRef} className={styles.root}>
        {(value || DEFAULT_VALUE).map((inputValue, index) => (
          <Input
            key={
              // eslint-disable-next-line react/no-array-index-key
              index
            }
            value={inputValue}
            onChange={this.changeValue(index)}
            onKeyDown={this.keyDown(index)}
            maxLength={4}
          />
        ))}
      </div>
    );
  }
}
