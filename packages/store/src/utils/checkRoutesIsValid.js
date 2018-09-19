import { routes } from 'server/routes';

export default pathname =>
  routes.findIndex(route => pathname.match(route.regex)) > -1;
