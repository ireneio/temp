// import
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { isFragment } from 'react-is';
import { Helmet } from 'react-helmet';

// definition
const mergeChild = (children): React.Element =>
  React.Children.map(children, child => {
    if (isFragment(child)) return mergeChild(child.props.children);

    if (child?.props.dangerouslySetInnerHTML)
      return React.cloneElement(
        child,
        null,
        // eslint-disable-next-line no-underscore-dangle
        child.props.dangerouslySetInnerHTML.__html,
      );

    return child;
  });

export default React.memo(({ children }: { children: React.Element }) => (
  <Helmet>{mergeChild(children)}</Helmet>
));
