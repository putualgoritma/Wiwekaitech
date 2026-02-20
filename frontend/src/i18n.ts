import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'id'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locales.includes(locale as Locale)
    ? locale
    : defaultLocale;

  return {
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
