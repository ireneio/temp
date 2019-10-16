import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { COLOR_TYPE } from 'constants/propTypes';

import Category from './Category';
import { PRODUCT_TYPE } from './constants';
import * as styles from './styles/specTable';

@radium
export default class SpecList extends React.Component {
  static propTypes = {
    productData: PRODUCT_TYPE.isRequired,
    transformLocale: PropTypes.func.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    showButton: PropTypes.bool.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    onChangeSpec: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['list', 'detail']).isRequired,
    name: PropTypes.string.isRequired,
    container: PropTypes.shape({}).isRequired,
  };

  render() {
    const {
      productData,
      transformLocale,
      colors,
      showButton,
      coordinates,
      onChangeSpec,
      mode,
      name,
      container,
    } = this.props;
    const { specs } = productData;
    let { variantsTree } = productData;

    return (
      <div style={styles.root(mode)}>
        {specs &&
          specs.map((category, index) => {
            const items = variantsTree.children;
            variantsTree = variantsTree.children[coordinates[index]];
            return (
              <Category
                container={container}
                key={category.id}
                level={index}
                selected={coordinates[index]}
                title={category.title}
                items={items}
                colors={colors}
                showButton={showButton}
                onChangeSpec={onChangeSpec}
                transformLocale={transformLocale}
                name={name}
              />
            );
          })}
      </div>
    );
  }
}
