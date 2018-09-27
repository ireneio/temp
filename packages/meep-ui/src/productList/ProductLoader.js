import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

import { COLOR_TYPE } from 'constants/propTypes';

const calculateX = (alignment, productWidth, loaderWidth) => {
  switch (alignment) {
    case 'right':
      return parseInt(productWidth - loaderWidth, 10);
    case 'center':
      return parseInt((productWidth - loaderWidth) / 2, 10);
    case 'left':
    default:
      return 0;
  }
};

const ProductLoader = ({
  limit,
  isGrid,

  alignment,
  productWidth,
  padding,
  showTitle,
  showDescription,
  showPrice,
  cartButton,

  colors,
  ...props
}) => {
  const Loaders = [];
  const imageHeight = parseInt(productWidth * 0.67, 10);

  let Title;
  let Description;
  let Price;
  let Button;

  let height = imageHeight + 10;

  if (showTitle) {
    Title = (
      <rect
        x={calculateX(alignment, productWidth, productWidth / 2)}
        y={height}
        rx="5"
        ry="5"
        width={parseInt(productWidth / 2, 10)}
        height="10"
      />
    );
    height += 20;
  }

  if (showDescription) {
    Description = (
      <>
        <rect x="0" y={height} rx="5" ry="5" width={productWidth} height="10" />
        <rect
          x="0"
          y={height + 15}
          rx="5"
          ry="5"
          width={productWidth}
          height="10"
        />
        <rect
          x="0"
          y={height + 30}
          rx="5"
          ry="5"
          width={productWidth}
          height="10"
        />
      </>
    );
    height += 45;
  }

  if (showPrice) {
    Price = (
      <rect
        x={calculateX(alignment, productWidth, productWidth / 3)}
        y={height}
        rx="5"
        ry="5"
        width={parseInt(productWidth / 3, 10)}
        height="10"
      />
    );
    height += 20;
  }

  if (cartButton) {
    const width = productWidth < 100 ? productWidth : 100;
    Button = (
      <rect
        x={calculateX(alignment, productWidth, width)}
        y={height}
        rx="5"
        ry="5"
        width={productWidth < 100 ? productWidth : 100}
        height="30"
      />
    );
    height += 40;
  }

  for (let index = 0; index < limit; index += 1) {
    Loaders.push(
      <ContentLoader
        key={`loader-${index}`}
        className="loaders"
        height={height}
        width={productWidth}
        speed={2}
        primaryColor={colors[3]}
        secondaryColor={colors[3]}
        primaryOpacity={0.3}
        secondaryOpacity={0.2}
        style={{
          height,
          width: productWidth,
          margin: padding / 2,
        }}
        {...props}
      >
        <rect
          x="0"
          y="0"
          rx="5"
          ry="5"
          width={productWidth}
          height={imageHeight}
        />
        {Title}
        {Description}
        {Price}
        {Button}
      </ContentLoader>,
    );
  }

  return Loaders;
};

/* eslint-disable react/no-typos */
ProductLoader.propTypes = {
  limit: PropTypes.number.isRequired,
  isGrid: PropTypes.bool.isRequired,
  alignment: PropTypes.string.isRequired,
  productWidth: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  showTitle: PropTypes.bool.isRequired,
  showDescription: PropTypes.bool.isRequired,
  showPrice: PropTypes.bool.isRequired,
  cartButton: PropTypes.bool.isRequired,
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
};
/* eslint-enable react/no-typos */

export default ProductLoader;
