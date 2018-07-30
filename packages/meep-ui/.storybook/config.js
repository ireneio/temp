import '@babel/polyfill';
import '@storybook/addon-console';
import '@storybook/addon-actions/register';
import { configure } from '@storybook/react';

/* eslint-disable-next-line import/no-unresolved, import/extensions */
import loadStories from './.cache';

configure(loadStories, module);
