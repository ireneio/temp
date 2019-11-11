import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Select } from 'antd';

import { withNamespaces } from '@store/utils/lib/i18n';

import { COLOR_TYPE, LOCALE_TYPE } from 'constants/propTypes';

import * as styles from './styles/category';

@withNamespaces('product-info')
@radium
export default class Category extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    selected: PropTypes.number.isRequired,
    title: LOCALE_TYPE.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    showButton: PropTypes.bool.isRequired,
    onChangeSpec: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    container: PropTypes.shape({}).isRequired,
  };

  render() {
    const {
      i18n,
      container,
      level,
      selected,
      title,
      items,
      colors,
      showButton,
      onChangeSpec,
      name,
    } = this.props;

    return (
      <div style={styles.root}>
        <div style={styles.label(colors)}>
          {title[i18n.language] || title.zh_TW}
        </div>

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
                {item.data.title[i18n.language] || item.data.title.zh_TW}
              </div>
            ))
          ) : (
            <Select
              dropdownMatchSelectWidth={false}
              dropdownClassName={name}
              onChange={value => {
                onChangeSpec(level, value);
              }}
              value={selected}
              getPopupContainer={() => container.current || document.body}
            >
              {items.map((item, index) => (
                <Select.Option
                  key={item.id}
                  value={index}
                  title={
                    item.data.title[i18n.language] || item.data.title.zh_TW
                  }
                >
                  {item.data.title[i18n.language] || item.data.title.zh_TW}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>
      </div>
    );
  }
}
