'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { locales } from '@/i18n';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';

const languageConfig = {
  en: { name: 'English', flag: '🇺🇸' },
  id: { name: 'Bahasa', flag: '🇮🇩' },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languageConfig[locale as keyof typeof languageConfig];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:scale-105 transition-transform"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <FaChevronDown className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-neutral-800 rounded-xl shadow-xl py-2 min-w-[150px] border border-neutral-200 dark:border-neutral-700">
          {locales.map((loc) => {
            const lang = languageConfig[loc as keyof typeof languageConfig];
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors ${
                  isActive ? 'bg-green-50 dark:bg-green-900/20' : ''
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className={`text-sm font-medium ${isActive ? 'text-green-500' : ''}`}>
                  {lang.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
