import { action } from '@storybook/addon-actions';
import React from 'react';

export const withRouter = (Component: React.ReactType): React.ReactType => (
  props: unknown,
) =>
  React.createElement(Component, {
    router: { pathname: 'mock-path' },
    ...props,
  });

export default {
  push: action('router push'),
  prefetch: action('router prefetch'),
};
