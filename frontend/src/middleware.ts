import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  // Match all routes except static assets and API routes
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
