
# Prerendering Setup for Sports 360 X

This document explains the prerendering setup for better SEO and initial load performance.

## Overview

Since this is a React Native + Expo app, traditional `react-snap` doesn't work directly with Expo's build process. Instead, we've implemented a hybrid approach:

1. **Static HTML pages** for key routes (`/analytics`)
2. **Enhanced noscript fallbacks** in the main HTML
3. **SSR-friendly React components** that show skeletons initially
4. **Custom build script** that combines everything

## Build Commands

```bash
# Standard web build
npm run build:web

# Build with prerendering (recommended for production)
npm run build:web:prerender
```

## How It Works

### 1. Static Prerendered Pages
- `web/analytics.html` → `dist/analytics/index.html`
- Contains SEO-friendly content and loading skeletons
- Automatically redirects to the React app after 2 seconds

### 2. SSR-Friendly Components
- `app/analytics.tsx` shows skeleton content initially
- Uses `isClient` state to detect client-side hydration
- Provides consistent experience across SSR and client rendering

### 3. Enhanced HTML
- `web/index.html` includes SEO content in hidden divs
- Improved noscript fallbacks with navigation links
- Loading states and error handling

## SEO Benefits

- **Faster First Contentful Paint**: Static HTML loads immediately
- **Better Crawling**: Search engines see actual content, not loading spinners
- **Improved Accessibility**: Works without JavaScript
- **Progressive Enhancement**: Gracefully upgrades to full React app

## Files Modified

- `package.json` - Added react-snap config and build scripts
- `app/analytics.tsx` - Added SSR-friendly skeleton rendering
- `web/index.html` - Enhanced with SEO content and better fallbacks
- `web/analytics.html` - Static prerendered analytics page
- `scripts/build-with-prerender.js` - Custom build script
- `workbox-config.js` - Service worker configuration

## Deployment

1. Run `npm run build:web:prerender`
2. Deploy the `dist/` folder to your web server
3. Ensure your server serves `/analytics/index.html` for `/analytics` requests

## Testing

```bash
# Test the prerendered build locally
npx serve dist

# Check specific routes
curl -I http://localhost:3000/analytics
curl -s http://localhost:3000/analytics | head -c 800
```

## Notes

- This approach works best for relatively static content
- Dynamic content still loads via JavaScript after initial render
- Mobile apps (iOS/Android) are unaffected by these changes
- Web performance and SEO are significantly improved
