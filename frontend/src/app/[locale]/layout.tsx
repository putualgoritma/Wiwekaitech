import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { defaultLocale, locales } from '@/i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const resolvedLocale = locales.includes(locale as any)
    ? locale
    : defaultLocale;

  const messages = await getMessages({ locale: resolvedLocale });

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <NextIntlClientProvider messages={messages}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
