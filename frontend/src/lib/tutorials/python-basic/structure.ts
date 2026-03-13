/**
 * Python Basic Tutorial Structure
 * Defines the organization and metadata for the Python tutorial book
 */

import type { TutorialStructure } from '../types';

export const pythonBasicStructure: TutorialStructure = {
  book: {
    id: 'python-basic',
    title: {
      en: 'Basic Python for Future Developers',
      id: 'Python Dasar untuk Developer Masa Depan',
    },
    slug: 'python-basic',
    author: 'Wiwekaitech Team',
    version: '1.0',
    lastUpdated: '2026-02-21',
    description: {
      en: 'A structured programming foundation designed to transform beginners into future backend developers',
      id: 'Fondasi pemrograman terstruktur yang dirancang untuk mengubah pemula menjadi backend developer masa depan',
    },
    keywords: [
      'python tutorial',
      'python for beginners',
      'python programming',
      'backend development',
      'python basics',
      'learn python',
      'python step by step',
    ],
    difficulty: 'beginner',
    estimatedHours: 40,
  },
  parts: [
    {
      number: 0,
      title: {
        en: 'Preface',
        id: 'Kata Pengantar',
      },
      icon: '🔹',
      chapters: [
        { slug: 'preface-why', file: '00-preface-why.md', order: 1 },
        { slug: 'preface-who', file: '00-preface-who.md', order: 2 },
        { slug: 'preface-how', file: '00-preface-how.md', order: 3 },
        { slug: 'preface-path', file: '00-preface-path.md', order: 4 },
      ],
    },
    {
      number: 1,
      title: {
        en: 'Foundations of Programming',
        id: 'Fondasi Pemrograman',
      },
      icon: '🧱',
      chapters: [
        { slug: 'intro-python', file: '01-intro-python.md', order: 5 },
        { slug: 'variables-datatypes', file: '02-variables-datatypes.md', order: 6 },
        { slug: 'conditionals', file: '03-conditionals.md', order: 7 },
        { slug: 'loops', file: '04-loops.md', order: 8 },
      ],
    },
    {
      number: 2,
      title: {
        en: 'Working with Data Structures',
        id: 'Bekerja dengan Struktur Data',
      },
      icon: '🗂',
      chapters: [
        { slug: 'collections', file: '05-collections.md', order: 9 },
      ],
    },
    {
      number: 3,
      title: {
        en: 'Writing Structured Programs',
        id: 'Menulis Program Terstruktur',
      },
      icon: '🧩',
      chapters: [
        { slug: 'functions', file: '06-functions.md', order: 10 },
        { slug: 'oop-basics', file: '07-oop-basics.md', order: 11 },
      ],
    },
    {
      number: 4,
      title: {
        en: 'Project-Based Implementation',
        id: 'Implementasi Berbasis Proyek',
      },
      icon: '🚀',
      chapters: [
        { slug: 'project-calculator', file: '08-project-calculator.md', order: 12 },
        { slug: 'project-student-management', file: '08-project-student-management.md', order: 13 },
        { slug: 'project-inventory', file: '08-project-inventory.md', order: 14 },
      ],
    },
    {
      number: 5,
      title: {
        en: 'Final Chapter',
        id: 'Bab Penutup',
      },
      icon: '🎓',
      chapters: [
        { slug: 'next-steps', file: '09-next-steps.md', order: 15 },
      ],
    },
    {
      number: 6,
      title: {
        en: 'Appendix',
        id: 'Lampiran',
      },
      icon: '📚',
      chapters: [
        { slug: 'appendix-cheatsheet', file: '10-appendix-cheatsheet.md', order: 16 },
        { slug: 'appendix-common-errors', file: '10-appendix-common-errors.md', order: 17 },
        { slug: 'appendix-development-tools', file: '10-appendix-development-tools.md', order: 18 },
        { slug: 'appendix-glossary', file: '10-appendix-glossary.md', order: 19 },
      ],
    },
  ],
};
