# Wiwekaitech Frontend

Production-ready Next.js frontend for Wiwekaitech company website.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Bilingual support (English & Indonesian) with next-intl
- ✅ SEO optimized
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Production-ready architecture

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build
npm run build

# Start production server
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utilities and API client
├── messages/         # i18n translations
├── types/            # TypeScript types
└── i18n.ts           # i18n configuration
```

## Pages

- `/` - Home page
- `/about` - About us
- `/products` - Products/services
- `/projects` - Portfolio
- `/tutorial` - Coding tutorials
- `/blog` - Blog posts
- `/contact` - Contact form

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

### Manual

```bash
npm run build
npm run start
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.wiwekaitech.com
NEXT_PUBLIC_SITE_URL=https://wiwekaitech.com
```

## License

© 2026 Wiwekaitech. All rights reserved.
