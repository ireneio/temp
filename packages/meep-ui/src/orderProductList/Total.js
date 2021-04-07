import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import OrderShowTotal from 'orderShowTotal';
import { COLOR_TYPE } from 'constants/propTypes';

import styles from './styles/total.less';

@enhancer
@radium
export default class Total extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { colors, children, ...props } = this.props;

    return (
      <>
        <div className={styles.root}>
          <OrderShowTotal {...props} />

          {!children ? null : (
            <div className={styles.wrapper}>
              {React.cloneElement(children, {
                className: styles.button,
              })}
            </div>
          )}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} {
                color: ${colors[3]};
                background: ${colors[0]};
              }

              .${styles.root} .${styles.button} {
                color: ${colors[2]};
                background: ${colors[4]};
              }

              @media (max-width: ${styles.screenSmMax}) {
                .${styles.root} {
                  border-top: 1px solid ${colors[5]};
                }
              }
            `,
          }}
        />
      </>
    );
  }
}
