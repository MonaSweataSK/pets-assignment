# Architecture

Technical reference for the structure, data flow, and design decisions in this project.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite |
| Routing | react-router-dom v7 |
| Styling | styled-components |
| Global State | global-use-state |
| Data Fetching | Native `fetch` API |

---

## Directory Structure

```
src/
├── api/            # API layer — fetch logic, URL construction, data mapping
├── components/     # Shared UI components (PetGrid, Navbar, SearchBar, etc.)
├── context/        # SelectionContext (thin wrapper, real state lives in global-use-state)
├── hooks/          # Custom hooks (usePets)
├── pages/          # Route-level page components
├── styles/         # GlobalStyles, ThemeProvider tokens
├── types/          # Shared TypeScript interfaces + ambient global.d.ts
├── ui/             # Primitive design system (Button, Dropdown, Toast, Toolbar)
└── utils/          # Pure utility functions (downloadImages)
```

---

## Data Flow

```
fetchPets(page)          ← src/api/pets.ts
      ↓
usePets() hook           ← src/hooks/usePets.ts
  - loading / error / empty states
  - isFetchingRef guard (synchronous, avoids race conditions)
  - setPets exposed for mode-switching handovers
      ↓
Home.tsx                 ← orchestration layer
  - filteredAndSortedPets (useMemo)
  - mode switch: isSortedMode = sortOrder !== 'none'
  - IntersectionObserver on 1px sentinel div
  - Passes pets → PetGrid → PetCard
  - Passes neighbor pets → PetDetailModal (prefetch)
      ↓
GlobalState              ← global-use-state
  selectedUrls: Set<string>
  toasts: ToastMessage[]
```

---

## API Layer (`src/api/pets.ts`)

Two data sources compose a single paginated feed:

| Page | Source | Count |
|---|---|---|
| 1 | Eulerity API (`/pets`) | 20 items (trimmed from 21 for a balanced 5×4 grid) |
| 2+ | Pexels API (`/v1/search?query=pets`) | 4 items per page |

Both sources are normalized to the same `Pet` interface:

```ts
interface Pet {
  title: string;
  description: string;
  url: string;
  created: string;  // ISO 8601
}
```

Pexels metadata (photographer, alt text) is synthesized using `@faker-js/faker` where no natural value exists.

---

## Custom Hook — `usePets`

```ts
const { pets, setPets, loading, isFetchingMore, error, loadMore, hasMore } = usePets();
```

Key design decisions:

**`isFetchingRef` (not `isFetchingMore` state)**
The guard that prevents duplicate concurrent API calls is a `useRef`, not `useState`. State updates are async — by the time `setIsFetchingMore(true)` propagates, another call can already be in-flight. A ref is synchronous and reads the current value immediately.

**`setPets` is exposed**
When the user disables sorting and resumes infinite scroll, the current sorted order is "frozen" into state before the filter clears. This prevents the list from reshuffling when `sortOrder` resets. `setPets` is the mechanism for this handover.

**`loadMore` is stable**
`loadMore` is wrapped in `useCallback`. The IntersectionObserver closure captures it without triggering reconnects on every render.

---

## Mode-Switching Architecture

The gallery has two mutually exclusive modes:

```
GalleryMode = 'infinite' | 'sorted'
```

**Infinite Mode** (default)
- `sortOrder === 'none'`
- Intersection Observer is active
- New pets append to the bottom on scroll
- Footer is hidden (unreachable behind an infinite list)

**Sorted Mode**
- `sortOrder !== 'none'`
- Intersection Observer is disconnected
- `filteredAndSortedPets` is a stable, derived snapshot via `useMemo`
- "Disable Sort" button appears at the bottom
- Footer renders after the Disable Sort section

**Transition: Sorted → Infinite**
```ts
const handleResetSort = () => {
  setPets(filteredAndSortedPets); // commit sorted order
  setSortOrder('none');           // clear filter
  setTimeout(() => loadMore(), 0); // queue next page fetch
};
```
Committing the sorted order to state before clearing means nothing jumps position. New items arrive at the bottom of the existing visible order.

---

## Global State (`global-use-state`)

React Context re-renders every consumer on every state change. With selection toggling on every checkbox click, this caused cascading re-renders across the entire tree.

`global-use-state` uses micro-subscriptions: only components subscribed to a specific key re-render when that key changes. No `Provider` wrapper is needed at the root.

All keys are registered in `src/types/global.d.ts`:

```ts
declare module 'global-use-state' {
  interface GlobalState {
    selectedUrls: Set<string>;
    toasts: ToastMessage[];
  }
}
```

This gives TypeScript full awareness of all global keys — incorrect key names or value types produce compile errors.

---

## Detail Modal

The pet detail view is an overlay modal, **not a dedicated route page**. This was a deliberate choice:

- The gallery (`Home.tsx`) remains mounted and in the DOM
- Selection state is never unmounted or reset during navigation
- The URL still updates (`/pet/:index`) for deep-linking and browser history
- The `useParams` hook on `Home.tsx` reads the index and conditionally renders the modal

**Prefetching**

When the modal opens on pet `N`, `Home.tsx` passes `nextPet` and `prevPet` as props. The modal runs a `useEffect` that creates transient `new Image()` elements pointed at the high-res URLs of both neighbors. These land in the browser's HTTP cache silently — no loading states, no network waterfalls triggered on navigation.

**Cache-aware spinner**

The loading spinner avoids false positives on cached images:
```ts
useEffect(() => {
  if (imgRef.current?.complete) {
    setIsImageLoading(false); // already cached, skip spinner
  } else {
    setIsImageLoading(true);
  }
}, [pet.url]);
```

---

## Routing

```
/                    Home (gallery + modal overlay on /pet/:index)
/pet/:index          Pet detail — same component, modal triggered by param
/about               About page
/privacy             Privacy policy
/terms               Terms of service
/contact             Contact page
```

The modal lives inside `Home.tsx`. The route `/pet/:index` does not render a new page — it triggers the modal via `useParams`. Navigating within the modal (next/prev) calls `navigate('/pet/N')`, pushing to browser history. The back button dismisses naturally.

---

## Responsive Breakpoints

```
Mobile   (≤ 640px):   1 column
Tablet   (≤ 900px):   2 columns
Desktop  (> 900px):   4 columns
```

The sticky header (`StickyHeader`) sits at `top: 80px` — offset by the Navbar height — ensuring the search and sort controls are always reachable without overlapping content.

---

## UI Primitives (`src/ui/`)

Small, reusable primitives kept separate from page-level components:

| Component | Purpose |
|---|---|
| `Toast` | Non-blocking notifications with configurable duration and type |
| `Button` | Styled base button with variant support |
| `Dropdown` | Generic dropdown container |
| `Toolbar` | Layout wrapper for action bars |

Each has its own `README.md` documenting props and usage. They are theme-aware — all styling values reference `props.theme` tokens rather than hard-coded values.
