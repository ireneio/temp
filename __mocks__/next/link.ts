// import
import React from 'react';
import { action } from '@storybook/addon-actions';

// definition
export default <T extends unknown>({ children, href }: { children: T }): T =>
  React.cloneElement(children, { onClick: () => action('link click')(href) });
