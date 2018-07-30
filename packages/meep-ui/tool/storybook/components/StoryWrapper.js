import React from 'react';
import PropTypes from 'prop-types';

/** avoid root state changing make story update. */
export default class StoryWrapper extends React.PureComponent {
  static propTypes = {
    componentProps: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { componentProps, children } = this.props;

    return React.cloneElement(children, componentProps);
  }
}
