import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing'; // ✅ FIX: Removed './src/'

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|ru|zh|ar)/:path*']
};