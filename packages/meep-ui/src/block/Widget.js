import React from 'react';
import PropTypes from 'prop-types';
import { warning } from 'fbjs';
import radium, { StyleRoot } from 'radium';

import { WIDGETSETTING_TYPE } from './constants';
import modules from './modules';

import styles from './styles/widget.less';

/**
 * odd level to vertical layout
 * even level to horizontal layout
 *
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃ level 1                     ┃
 * ┃ ┏━━━━━━━━━━━━━┓ ┏━━━━━━━━━┓ ┃
 * ┃ ┃ level 2     ┃ ┃ level 2 ┃ ┃
 * ┃ ┃ ┏━━━━━━━━━┓ ┃ ┗━━━━━━━━━┛ ┃
 * ┃ ┃ ┃ level 3 ┃ ┃             ┃
 * ┃ ┃ ┗━━━━━━━━━┛ ┃             ┃
 * ┃ ┃ ┏━━━━━━━━━┓ ┃             ┃
 * ┃ ┃ ┃ level 3 ┃ ┃             ┃
 * ┃ ┃ ┗━━━━━━━━━┛ ┃             ┃
 * ┃ ┗━━━━━━━━━━━━━┛             ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃ level 1                     ┃
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 */
@radium
export default class Widget extends React.PureComponent {
  static propTypes = {
    module: PropTypes.string,
    widgets: PropTypes.arrayOf(PropTypes.shape({})),
    widgetSetting: WIDGETSETTING_TYPE.isRequired,
  };

  static defaultProps = {
    widgets: null,
    module: null,
  };

  render() {
    const { module, widgets, widgetSetting, id, ...props } = this.props;

    warning(
      widgets || (!widgets && module),
      'If `widgets` of the `Widget` is `null`, `module` can not be `null.`',
    );

    const { padding, level, componentWidth, product } = widgetSetting;
    const Component = module ? modules[module] : null;

    const hasVisibleModule = Boolean(Component) && module !== 'viewTracking';

    return (
      <StyleRoot
        ref={node => {
          this.widget = node;
        }}
        className={styles.root}
        style={
          level === 1
            ? {
                display: 'flex',
                flexWrap: 'wrap',
                flexShrink: 0,
                alignItems: 'flex-start',
                minWidth: `${componentWidth}px`,
              }
            : {
                display: level % 2 ? 'flex' : 'block',
                flex: `1 1 ${componentWidth}px`,
              }
        }
      >
        {Component ? (
          <div id={`wrapper-${id}`} className={styles.wrapper}>
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  #wrapper-${id} {
                    padding: ${hasVisibleModule ? padding / 2 : 0}px;
                  }

                  @media (max-width: ${styles.screenSmMax}) {
                    #wrapper-${id} {
                      padding: ${hasVisibleModule ? padding / 4 : 0}px;
                    }
                  }
                `,
              }}
            />
            <Component {...props} id={id} product={product} />
          </div>
        ) : (
          widgets.map(({ id: widgetId, ...data }, index) => (
            <Widget
              {...data}
              key={widgetId || `${level}-${index}`}
              id={widgetId}
              widgetSetting={{
                ...widgetSetting,
                level: level + 1,
              }}
            />
          ))
        )}
      </StyleRoot>
    );
  }
}
