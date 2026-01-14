import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation'; // ✅ FIX: Use createNavigation

export const routing = defineRouting({
  locales: ['en', 'ru', 'zh'],
  defaultLocale: 'en'
});

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);
