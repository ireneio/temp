import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Select } from 'antd';

import { COLOR_TYPE, LOCALE_TYPE } from 'constants/propTypes';

import * as styles from './styles/category';

@radium
export default class Category extends React.Component {
  static propTypes = {
    level: PropTypes.number.isRequired,
    selected: PropTypes.number.isRequired,
    title: LOCALE_TYPE.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    showButton: PropTypes.bool.isRequired,
    onChangeSpec: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
  };

  render() {
    const {
      container,
      level,
      selected,
      title,
      items,
      colors,
      showButton,
      onChangeSpec,
      transformLocale,
      name,
    } = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.label(colors)}>{transformLocale(title)}</div>
        <div style={styles.itemWrapper}>
          {showButton ? (
            items.map((item, index) => (
              <div
                key={item.id}
                style={styles.item(colors, index === selected)}
                onClick={() => {
                  onChangeSpec(level, index);
                }}
              >
                {transformLocale(item.data.title)}
              </div>
            ))
          ) : (
            <Select
              dropdownClassName={name}
              onChange={value => {
                onChangeSpec(level, value);
              }}
              value={selected}
              getPopupContainer={() =>
                container ? document.getElementById(container) : document.body
              }
            >
              {items.map((item, index) => (
                <Select.Option
                  key={item.id}
                  value={index}
                  title={transformLocale(item.data.title)}
                >
                  {transformLocale(item.data.title)}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>
      </div>
    );
  }
}
