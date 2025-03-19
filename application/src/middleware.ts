import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!.*\\..*).*)'
};