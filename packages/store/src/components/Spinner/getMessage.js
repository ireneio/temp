import * as Utils from 'utils';
import * as LOCALE from './locale';

export default (type, locale) =>
  Utils.getIn([type, locale])(LOCALE) || 'Loading...';
