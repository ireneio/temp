// import
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { isFragment } from 'react-is';
import { Helmet } from 'react-helmet';

// definition
export default React.memo(({ children }: { children: React.Element }) => (
  <Helmet>
    {!isFragment(children)
      ? children
      : React.Children.map(children.props.children, child =>
          !child.props.dangerouslySetInnerHTML
            ? child
            : React.cloneElement(
                child,
                null,
                // eslint-disable-next-line no-underscore-dangle
                child.props.dangerouslySetInnerHTML.__html,
              ),
        )}
  </Helmet>
));
