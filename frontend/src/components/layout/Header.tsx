'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import Container from '../shared/Container';
import LanguageSwitcher from './LanguageSwitcher';
import { SITE_NAME } from '@/lib/constants';

const navItems = [
  { name: 'home', href: '/' },
  { name: 'products', href: '/products' },
  { name: 'projects', href: '/projects' },
  { name: 'tutorial', href: '/tutorial' },
  { name: 'blog', href: '/blog' },
  { name: 'contact', href: '/contact' },
];

export default function Header() {
  const t = useTranslations('nav');
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 w-full px-6 py-4 flex items-center justify-between z-50 transition-all duration-300
        ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#1E1E21]/80 backdrop-blur-md shadow-md'
            : 'bg-white dark:bg-[#1E1E21]'
        }`}
    >
      <Container className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setActive('home')}>
          {/* Modern Tech Logo */}
          <div className="relative w-10 h-10">
            {/* Outer glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity"></div>
            
            {/* Logo icon */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              {/* W letter with modern design */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 3h4l3 12 3-12h4l3 12 3-12h4l-4 18h-4l-3-12-3 12H8L2 3z" />
              </svg>
            </div>
          </div>
          
          {/* Company name */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-green-600 group-hover:to-green-400 transition-all duration-300">
              {SITE_NAME}
            </span>
            <span className="text-[0.6rem] font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase hidden md:block">
              ERP Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group cursor-pointer"
              onClick={() => setActive(item.name)}
            >
              <Link
                href={item.href}
                className={`text-base font-medium ${active === item.name ? 'font-bold' : 'opacity-80'} hover:opacity-100`}
              >
                {t(item.name)}
              </Link>
              {active === item.name && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-green-500 rounded"
                />
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:scale-105 transition-transform"
          >
            {theme === 'dark' ? (
              <FaSun className="text-yellow-400 text-lg" />
            ) : (
              <FaMoon className="text-gray-800 text-lg" />
            )}
          </button>

          <Link href="/contact">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow hover:opacity-90 transition">
              {t('contact')}
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800"
          >
            {theme === 'dark' ? (
              <FaSun className="text-yellow-400 text-sm" />
            ) : (
              <FaMoon className="text-gray-800 text-sm" />
            )}
          </button>
          
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <IoClose className="text-2xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute top-full right-6 mt-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-xl py-4 px-6 flex flex-col gap-4 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium ${active === item.name ? 'font-bold text-green-500' : 'opacity-80'}`}
                onClick={() => {
                  setActive(item.name);
                  setMenuOpen(false);
                }}
              >
                {t(item.name)}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-4 py-2 rounded-xl shadow hover:opacity-90 transition text-center"
              onClick={() => setMenuOpen(false)}
            >
              {t('contact')}
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}
