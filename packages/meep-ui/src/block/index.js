import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';

import Widget from './Widget';
import { BLOCKS_TYPE } from './constants';
import * as styles from './styles';

@enhancer
@radium
export default class Block extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number,
    blocks: BLOCKS_TYPE.isRequired,
  };

  static defaultProps = {
    width: null,
  };

  render() {
    const { width: maxWidth, blocks } = this.props;

    return (
      <div style={styles.root(maxWidth)}>
        {blocks.map(({ id, widgets, width, componentWidth, padding }) => (
          <div
            key={id}
            id={`block-${id}`}
            style={styles.block(width, componentWidth, padding)}
          >
            {(widgets || []).map(({ id: widgetId, ...data }, index) => (
              <Widget
                {...data}
                key={widgetId || `${id}-${index}`}
                id={widgetId}
                widgetSetting={{
                  componentWidth,
                  padding,
                  level: 1,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
