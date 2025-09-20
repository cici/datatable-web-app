# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a SvelteKit web application with TypeScript that displays event data in a searchable, paginated datatable. The project uses TLS-disabled deployment configuration and connects to an external API for event data.

## Development Commands

### Core Development
```bash
npm run dev                 # Start dev server on port 3006
npm run build              # Build for production
npm run preview            # Preview production build
```

### Code Quality
```bash
npm run check              # Type-check with svelte-check
npm run check:watch        # Type-check in watch mode
npm run lint               # Check with Prettier and ESLint
npm run format             # Format code with Prettier
```

### Testing
```bash
npm test                   # Run Playwright e2e tests
```

### Special Deployment Configuration
The README.md specifies TLS-disabled deployment:
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm set strict-ssl=false
npm --loglevel verbose install
```

## Architecture

### Framework Stack
- **SvelteKit** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** with custom components
- **Node.js adapter** for server deployment
- **Playwright** for e2e testing

### Project Structure

#### Route Structure
- Single-page application with main route at `/`
- Server-side logic in `+page.server.ts` (currently commented out)
- Layout with navbar and toast notifications

#### Component Architecture
Components are organized in `src/lib/components/`:
- **Data Display**: `simple-table.svelte`, `mobile-card.svelte`, `mobile-list.svelte`
- **Controls**: `search-bar.svelte`, `filter-dialog.svelte`, `sort-popup.svelte`, `Items-per-page.svelte`
- **Layout**: `layout/navbar.svelte`, `pagination-footer.svelte`
- **UI**: `spinner.svelte`, plus shadcn-style components in `ui/`

#### State Management
Svelte stores in `src/lib/stores/`:
- `filters.ts` - Filter state management
- `sorting.ts` - Sort state management  
- `filtersCount.ts` - Filter count tracking

#### Path Aliases
Configured in `svelte.config.js`:
- `$lib` → `src/lib`
- `$utils` → `src/lib/utils`
- `$routes` → `src/routes`
- `$assets` → `src/lib/assets`
- `$data` → `src/lib/data`
- `$types` → `src/lib/types`

### Data Flow
The main page fetches event data from external API endpoints:
- `/api/get-events` - Paginated event listing
- `/api/search-events` - Filtered/searched events

Data includes event information with full count for pagination, displayed in both desktop table and mobile card views.

### Key Dependencies
- **UI Components**: `bits-ui`, `lucide-svelte` icons, `svelte-headless-table`
- **Styling**: `tailwindcss`, `tailwind-merge`, `tailwind-variants`
- **Utilities**: `clsx`, `mode-watcher`, `svelte-sonner` for toasts

## Testing

Playwright configuration runs tests against built preview server on port 4173. Test files should match pattern `*.{test,spec}.{js,ts}` in the `tests/` directory.

## API Endpoint Testing (curl and Postman)

The UI calls two JSON POST endpoints expected to be available under the app origin:
- POST `/api/get-events`
- POST `/api/search-events`

Local base URLs:
- Dev: http://localhost:3006
- Preview: http://localhost:4173

curl examples (Dev):
```bash
# Get events (pagination)
curl -s \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{"selectedPage":1,"perPage":10}' \
  http://localhost:3006/api/get-events | jq .

# Search events (song|venue|city)
curl -s \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{"selectedPage":1,"perPage":10,"searchValue":"love","searchType":"song"}' \
  http://localhost:3006/api/search-events | jq .
```

curl examples (Preview):
```bash
curl -s -H 'Content-Type: application/json' -X POST \
  -d '{"selectedPage":1,"perPage":10}' \
  http://localhost:4173/api/get-events | jq .

curl -s -H 'Content-Type: application/json' -X POST \
  -d '{"selectedPage":1,"perPage":10,"searchValue":"madison","searchType":"city"}' \
  http://localhost:4173/api/search-events | jq .
```

TLS note (only for non-production testing): if your target uses a self-signed certificate as in README, add `-k` to curl. In Postman, disable SSL verification for that domain.

Postman setup:
- Method: POST; URL: `{base}/api/get-events` or `{base}/api/search-events`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
  - Get events: `{ "selectedPage": 1, "perPage": 10 }`
  - Search events: `{ "selectedPage": 1, "perPage": 10, "searchValue": "love", "searchType": "song|venue|city" }`

Response contract expected by the app:
- 200 JSON with shape: `{ "results": { "show_list": [ { "full_count": number, ... }, ... ] } }`
- The app reads `eventsData = data.results.show_list` and derives total count from `data.results.show_list[0].full_count`.

If you get 404 locally:
- This repo doesn’t currently define SvelteKit endpoint handlers under `src/routes/api`. Either point requests at the deployed backend that serves these routes, or implement handlers at:
  - `src/routes/api/get-events/+server.ts`
  - `src/routes/api/search-events/+server.ts`
