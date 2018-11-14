import React from 'react';
import PropTypes from 'prop-types';
import { warning } from 'fbjs';
import radium, { StyleRoot } from 'radium';

import { WIDGETSETTING_TYPE } from './constants';
import modules from './modules';
import * as styles from './styles/widget';

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
    const { module, widgets, widgetSetting, ...props } = this.props;

    warning(
      widgets || (!widgets && module),
      'If `widgets` of the `Widget` is `null`, `module` can not be `null.`',
    );

    const { level } = widgetSetting;
    const Component = module ? modules[module] : null;

    const hasVisibleModule = Boolean(Component) && module !== 'viewTracking';

    return (
      <StyleRoot
        ref={node => {
          this.widget = node;
        }}
        style={styles.root(widgetSetting, hasVisibleModule)}
      >
        {Component ? (
          <Component {...props} />
        ) : (
          widgets.map(({ id, ...data }, index) => (
            <Widget
              {...data}
              key={id || `${level}-${index}`}
              id={id}
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
