import '@storybook/addon-viewport/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
// eslint-disable-next-line import/no-extraneous-dependencies
import { addons } from '@storybook/addons';

addons.setConfig({
  showPanel: process.env.STORYBOOK_ENV !== 'static',
});
