# PROMPTS.md

A log of messages sent to AI tools during development of this project.

---

## 2026-04-07 — Project Setup & Core Architecture

> set up a vite react typescript project. create the pet interface, api layer using fetch (not axios), a custom usePets hook that handles loading/error/empty states explicitly, router config with react-router-dom, and sort/filter utilities as separate modules

> add a selection context using react context api. it needs to persist when navigating between routes — selecting images and going to a detail view and back should not lose the selection

> add a download utility that handles multi-image download from a list of URLs

---

## 2026-04-08 — UI Foundation & Pages

> build the home page grid, about page, and a selection toolbar that shows count + estimated file size. use styled-components throughout

> create a design system / component library structure — button, dropdown, toast, toolbar as reusable ui primitives with their own README docs

> the selection toolbar UI needs improvement — it's not prominent enough when items are selected. make it more visible and actionable

---

## 2026-04-09 — Detail View & Navigation

> add a pet detail page at /pets/:id with full image view, title, description, and navigation. use dynamic routing

> add carousel navigation in the detail view — previous and next buttons to move between pets without going back to the gallery

> switch pet routes from slug-based to numeric index — /pet/0, /pet/1 etc. simpler and avoids slug generation issues

> remove the theme switcher — it's adding complexity without enough value for now

---

## 2026-04-10 — Performance, Modal Refactor & Global State

> the detail page is a full route but it breaks selection state when navigating away. refactor the detail view into an inline modal instead of a separate route so the gallery stays mounted and selection persists. wire up keyboard navigation (arrow keys, escape) and zoom on click

> the image sizes in the detail view are wrong — they're loading full resolution and overflowing the container. fix the sizing and object-fit

> preconnect to the pexels image CDN in index.html so the browser starts TLS handshake earlier. small but real LCP improvement

> move the pexels fetch to module level so it doesn't re-initialize on every render. api calls shouldn't be inside component lifecycle if avoidable

> first 4 images should use eager loading, the rest lazy. also pass fetchpriority="high" to the LCP image specifically — the browser needs a hint

> the selection context is re-rendering everything when one item changes. replace it with a custom global state primitive (like use-sync-external-store pattern) instead of react context — context triggers all consumers on every update, this is a known perf issue. keep the same API surface so nothing else breaks

> specifically use `global-use-state` — it gives micro-subscriptions so only components that subscribe to a specific key re-render. no Provider wrapping needed at the root tree. also readable outside the react cycle via `getGlobalState`/`setGlobalState` which is useful for the download utility. register all keys in `src/types/global.d.ts` with proper types so intellisense enforces correct usage everywhere

> now document the arch — add READMEs in hooks/, ui/, pages/, types/ explaining what each layer does and why

> i'm getting a type error — Property 'as' is missing. the styled-component is typed against Link but i'm passing as="div" in some places. how do i fix this without removing the polymorphic prop

> update dependencies and fix any style regressions from the refactor

---

## 2026-04-11 — Infinite Scroll, Sort Architecture & Build Fixes

> add infinite scroll using intersection observer. augment the eulerity pets with pexels images so the gallery can grow beyond the initial 21. usePets hook needs a loadMore function and a hasMore flag

> the infinite scroll is appending new images to the front of the array instead of the end. fix the ordering. also there are duplicate fetches happening — need a synchronous ref-based guard to prevent concurrent calls, not just a state check (state updates are async)

> sort and infinite scroll are fundamentally broken together — sorting re-sorts the whole list including items added by infinite scroll, so things jump around. the right fix is a mode-switching architecture:
> - default mode: infinite scroll, no sort applied, data streams in at the bottom
> - sort mode: fetch stops, sort is applied to current data, paginated/stable view
> switching sort → freeze the list and sort it. clearing sort → hand the current order back to state and resume streaming from where we left off

> `npm run build` is failing:
> ```
> TS6133: 'useMemo' is declared but its value is never read (DownloadDropdown.tsx)
> TS6133: 'css' is declared but its value is never read (DownloadDropdown.tsx)
> TS6133: 'useToast' is declared but its value is never read (PetGrid.tsx)
> TS2304: Cannot find name 'useMemo' (PetGrid.tsx:192)
> ```
> clean up unused imports and add the missing useMemo import

> add skeleton loading cards so the layout doesn't shift on initial load — show 8 skeleton cards while the first fetch is in flight

> add privacy, terms, contact pages and wire up their routes

---

## 2026-04-11 — Sticky Header & Sort UX

> search and sort bar should be sticky at the top when scrolling. when sort mode is active, stop the infinite scroll and show a button at the bottom — "Disable Sort to See New Images". clicking it should resume streaming

> after disabling sort, the existing order should stay stable — no reshuffling. just commit the current sorted order to state and start appending new fetches to the end. also trigger a fetch immediately on reset

> the sentinel div for infinite scroll is 40px and visible as a gap at the bottom. reduce it to 1px invisible. also the initial fetch returns 21 items which gives an orphan row — trim to 20 (5 full rows of 4)

---

## 2026-04-12 — Modal Prefetch, Mobile & Final Polish

> in the detail modal, fast navigation causes the previous image to persist while the new one loads — it looks like one image is stuck across all pets. fix it with a loading spinner that shows immediately on navigation. also prefetch the next and previous pet images in the background when a modal opens, so navigation feels instant

> `PetDetailModal.tsx:300 Uncaught ReferenceError: nextPet is not defined` — added it to the interface but forgot to destructure it in the component signature

> prefetching is breaking the spinner — it persists even after the image loads. issue is the image is already cached by the time the component mounts so onLoad never fires. check imgRef.current.complete on mount and skip the loader if true

> on mobile devices, allow selecting images by clicking. show the checkbox always on mobile (no hover needed). also add long-press gesture (500ms) to enter selection mode — fire vibrate() as haptic feedback

> remove the footer in infinite scroll mode — the list never ends so the footer is unreachable anyway. when sort mode is active show the footer below the reset section. also auto-scroll to top when sort changes so the user sees the start of the new order

> after downloading, clear the selection automatically. also clicking an image should always open the modal even if other items are selected — selection should only happen via the checkbox, not image clicks. remove the "2 / 20" counter in the modal, it's confusing

> remove the mobile long-press and tap-to-toggle selection. keep checkboxes always visible on mobile but image clicks should always open the detail view. selection is checkbox-only

> in the detail modal the image is overlapping the size dropdown when it opens. just fix the z-index
