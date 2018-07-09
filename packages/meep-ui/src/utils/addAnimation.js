import React from 'react';
import warning from 'fbjs/lib/warning';
import radium, { StyleRoot } from 'radium';

/* eslint-disable react/no-array-index-key */
export const loadAnimation = styles =>
  styles.map(({ animationName }, index) => (
    <StyleRoot key={index} style={{ animationName }} />
  ));
/* eslint-enable react/no-array-index-key */

export default (animationName, ...styles) => {
  warning(styles && styles.length >= 2, 'Here are needed at least two styles.');

  const max = styles.length - 1;
  const animations = {};
  const diff = 100 / max;

  styles.forEach((style, index) => {
    animations[`${diff * index}%`] = style;
  });

  return {
    ...styles[max],
    animationName: radium.keyframes(animations, animationName),
  };
};
