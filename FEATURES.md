# Features

A breakdown of every feature built in this project — both the required deliverables from the challenge brief and the additional improvements made during development.

---

## ✅ Challenge Requirements

### Data & Display
- **Pet Gallery** — Fetches pets from the Eulerity API (`/pets`) using native `fetch`. Displays image, title, description, and creation date in a responsive card grid
- **Compelling Presentation** — Cards with smooth hover effects, selection overlays, skeleton loaders, and graceful image error fallbacks

### Multi-Image Selection & Download
- **Downloadable Selection** — Users can select multiple images and download them all at once via the selection toolbar
- **Live Count + File Size Estimate** — Toolbar shows total number selected and a running estimate of total file size
- **Select All / Clear Selection** — One-click controls to select the entire visible set or clear everything

### Sorting
- Sort by Name A→Z
- Sort by Name Z→A
- Sort by Date (Newest First)
- Sort by Date (Oldest First)

### Search
- Real-time search bar filtering pets by title or description

### Styled Components
- All UI built with `styled-components`. No raw CSS files. Theme tokens passed via `ThemeProvider`

### Routing (react-router-dom)
- `/` — Gallery home
- `/pet/:index` — Pet detail view (dynamic route, numeric index)
- `/about` — About page
- `/privacy`, `/terms`, `/contact` — Supporting pages

### Custom Data Hook
- `usePets` — Handles loading state, error state, empty state, pagination cursor, and a synchronous duplicate-call guard via `useRef`

### Global State
- Selection state is globally shared using `global-use-state`. Persists across route transitions — navigating into a pet detail and back retains all selections

### Infinite Scroll
- Intersection Observer monitors a 1px sentinel div at the bottom of the list. Triggers `loadMore()` automatically. No scroll event listeners

### Responsive Layout
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 4 columns

### Code Documentation
- Inline comments throughout critical logic
- `README.md` files in `src/hooks/`, `src/ui/`, `src/pages/`, `src/context/`, `src/components/`
- `src/global-state-readme.md` documenting global state usage patterns

---

## 🚀 Self-Initiated Improvements

### Mode-Switching Architecture (Infinite ↔ Sorted)
Infinite scroll and sorting are fundamentally incompatible — sorting requires a complete dataset, infinite scroll assumes you don't have it. Instead of compromising, the gallery switches modes:
- **Infinite Mode** (default) — data streams in at the bottom, no sort applied
- **Sorted Mode** — triggered when a sort filter is selected. Streaming stops. A "Disable Sort to See New Images" button lets users hand back the sorted order and resume streaming without items jumping

### Sticky Search & Sort Header
The search bar and selection toolbar are `position: sticky` beneath the navbar. Always reachable, regardless of scroll depth

### Smart Prefetching in Detail Modal
When a pet is opened in the detail view, the high-resolution URLs of the previous and next pets are preloaded via `new Image()` in the background. Navigation between pets becomes near-instant

### Image Loading Spinner + Cache-Aware Detection
The detail modal shows a loading spinner while a new image fetches. If the image was already prefetched and cached, it checks `img.complete` on mount and skips the spinner entirely — no false loading states

### Dynamic WebP Thumbnails
Grid cards load 600px WebP-optimized thumbnails via Pexels URL parameters instead of full resolution images. The modal loads a 2400px high-res version only when opened

### Pexels Augmentation
After the initial 20 Eulerity pets, subsequent infinite scroll pages pull from the Pexels API (`/v1/search?query=pets`). Eulerity's static 20-item dataset becomes an effectively unlimited feed

### Stable Sort Reset
When the user disables sorting, the current sorted order is committed to state before clearing the filter. New items append to the bottom without reshuffling what's already on screen

### Skeleton Loading
Initial gallery load shows 8 animated skeleton cards instead of a blank page, eliminating CLS and giving users immediate structural feedback

### Download Size Options
The download dropdown lets users choose between Original, Large (1920px), Medium (1280px), Small (640px), or Custom resolution before downloading

### Post-Download Selection Reset
After a download completes, all selections are cleared automatically. Ready for the next batch without manual cleanup

### Mobile-Optimised Checkboxes
Selection checkboxes are always visible on mobile (no hover required). Mobile devices lack pointer hover states — the checkbox is the primary affordance

### Conditional Footer
The footer is hidden during infinite scroll mode (unreachable behind an endless list). It appears only in sorted mode where the list has a defined end

### Auto-Scroll on Sort
When a sort filter is applied, the page smoothly scrolls to the top so the user sees the start of the ordered results, not the middle

### Pexels Rate Limit Resilience
Image load errors (e.g., 403s from Pexels rate limiting) render a theme-consistent fallback placeholder instead of broken image icons
