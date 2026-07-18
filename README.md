# Pokedex

A Pokemon demo app built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Chart.js. Fetches data from the [PokeAPI](https://pokeapi.co/).

## Features

- Browse the first 12 Pokemon with search filtering
- Radar chart and stat bars for each Pokemon's base stats
- Dark mode toggle
- Responsive design
- Server-side API routes with ISR caching
- TypeScript with full type definitions
- Unit and component tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Charting:** Chart.js + react-chartjs-2
- **Language:** TypeScript
- **Testing:** Vitest + Testing Library

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/pokemon?limit=N` | GET | Fetch Pokemon list with details |
| `/api/pokemon/[id]` | GET | Fetch a single Pokemon by ID or name |

## Project Structure

```
app/
├── api/pokemon/          # REST API routes
├── about/                # About page
├── components/           # Reusable UI components
├── contexts/             # React context providers
├── hooks/                # Custom React hooks
├── error.tsx             # Error boundary
├── globals.css           # Global styles
├── layout.tsx            # Root layout
├── loading.tsx           # Loading state
└── page.tsx              # Home page
types/
└── pokemon.ts            # TypeScript type definitions
tests/
├── ClientWrapper.test.tsx
├── PokemonCard.test.tsx
├── Search.test.tsx
└── setup.ts              # Test setup
```
