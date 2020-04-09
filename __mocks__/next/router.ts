// import
import { action } from '@storybook/addon-actions';
import React from 'react';

// definition
const router = {
  pathname: 'mock-pathname',
  query: {},
  push: window.test ? jest.fn() : action('router push'),
  prefetch: window.test ? jest.fn() : action('router prefetch'),
  replace: window.test ? jest.fn() : action('router replace'),
};

export const withRouter = (Component: React.ReactType): React.ReactType => (
  props: unknown,
) =>
  React.createElement(Component, {
    router,
    ...props,
  });

export const useRouter = (): typeof router => router;

export default router;
