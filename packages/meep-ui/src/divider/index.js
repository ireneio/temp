import React from 'react';

import { screenSmMax } from '@store/utils/lib/styles';

import {
  ID_TYPE,
  COLOR_TYPE,
  ALIGNMENT_TYPE,
  CONTENT_WIDTH_TYPE,
  POSITIVE_NUMBER_TYPE,
} from 'constants/propTypes';

import styles from './styles/index.less';

export default class Divider extends React.PureComponent {
  static propTypes = {
    /** props */
    background: COLOR_TYPE,
    id: ID_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
    height: POSITIVE_NUMBER_TYPE.isRequired,
    alignment: ALIGNMENT_TYPE.isRequired,
    radius: POSITIVE_NUMBER_TYPE.isRequired,
  };

  static defaultProps = {
    background: null,
  };

  render() {
    const {
      id,
      background,
      contentWidth,
      height,
      alignment,
      radius,
    } = this.props;

    return (
      <div
        id={`divider-${id}`}
        className={`${styles.root} ${styles[alignment]}`}
      >
        <div
          style={{
            background: background || 'transparent',
            width: `${contentWidth}%`,
            borderRadius: radius,
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              #divider-${id} > div {
                height: ${height}px;
              }

              @media (max-width: ${screenSmMax}) {
                #divider-${id} > div {
                  height: ${height / 2}px;
                }
              }
            `,
          }}
        />
      </div>
    );
  }
}
