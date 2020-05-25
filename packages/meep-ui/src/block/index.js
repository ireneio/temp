import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { screenSmMax } from '@store/utils/lib/styles';

import { enhancer } from 'layout/DecoratorsRoot';

import Widget from './Widget';
import { BLOCKS_TYPE } from './constants';

import styles from './styles/index.less';

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
      <div
        className={styles.root}
        style={{ maxWidth: !maxWidth ? '100%' : `${maxWidth}px` }}
      >
        {blocks.map(({ id, widgets, width, componentWidth, padding }) => (
          <div
            key={id}
            id={`block-${id}`}
            className={styles.block}
            style={{
              width: `${width || 100}%`,
              minWidth: `${componentWidth}px`,
            }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  #block-${id} {
                    padding: ${padding / 2}px;
                  }
                  @media (max-width: ${screenSmMax}) {
                    #block-${id} {
                      padding: ${padding / 4}px;
                    }
                  }
                `,
              }}
            />
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
