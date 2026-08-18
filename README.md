# Chara Scribe Vision

A visual character-reference workspace for uploading an image, selecting a category, and reviewing structured character information.

## Overview

Chara Scribe Vision provides a focused interface for image-based character exploration. Users upload an image, choose a category such as anime, movies, or series, and review a structured result containing identity, source series, description, traits, popularity, and first appearance.

## Highlights

- Drag-and-drop image upload with preview.
- Category selection for different character domains.
- Structured result card with traits and reference metadata.
- Loading, error, and empty states for a polished user flow.
- Service boundary that can be connected to a production recognition provider.

## Technology

- React 18 and TypeScript
- Vite
- Tailwind CSS and shadcn/ui
- Supabase client integration
- Zod, date-fns, and Lucide React

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` when backend configuration is required. Keep local environment files and private service credentials out of version control.

## Recognition service

The current client flow uses a service abstraction in `src/services/characterRecognition.ts`. The repository includes documentation for connecting a production recognition provider; provider credentials should be supplied through server-side environment variables rather than browser code.

## Project structure

The primary screen is under `src/pages/Index.tsx`. Upload, category, and result experiences are separated into `src/components/`, while provider integration remains isolated under `src/services/`.

## Status

A portfolio prototype focused on image upload UX, structured results, and clean integration boundaries for visual recognition services.

## License

No license has been declared yet. Add a license before accepting external contributions or distributing the project.

## Author

**Bilel JM** — [GitHub](https://github.com/bilel11111)
