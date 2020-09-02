// import
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { isFragment } from 'react-is';
import { Helmet } from 'react-helmet';

// definition
export default React.memo(({ children }: { children: React.Element }) => (
  <Helmet>
    {React.Children.map(children, child =>
      !isFragment(child)
        ? child
        : React.Children.map(child.props.children, fragmentChild =>
            !fragmentChild.props.dangerouslySetInnerHTML
              ? fragmentChild
              : React.cloneElement(
                  fragmentChild,
                  null,
                  // eslint-disable-next-line no-underscore-dangle
                  fragmentChild.props.dangerouslySetInnerHTML.__html,
                ),
          ),
    )}
  </Helmet>
));
