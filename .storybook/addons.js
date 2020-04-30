import '@storybook/addon-viewport/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import { addons } from '@storybook/addons';

addons.setConfig({
  showPanel: process.env.STORYBOOK_ENV !== 'static',
});
