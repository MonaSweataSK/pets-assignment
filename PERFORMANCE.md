# Performance

A record of the performance issues identified during development and the specific solutions implemented to resolve them.

---

## 1. Empty Screen on Load (CLS + LCP)

**Problem**  
On initial page load, the gallery showed a completely blank screen for several seconds before any content appeared. Under network throttling (simulated 3G), this extended to 40+ seconds with no user feedback whatsoever.

**Root Cause**  
The API call completed asynchronously, but nothing was rendered in the meantime. The loading state existed in code but no UI reflected it.

**Solution**  
Introduced 8 animated skeleton cards rendered immediately on mount, before any data arrives. The layout stabilizes on first paint — no content shift when real images load in.

```tsx
{loading && pets.length === 0 ? (
  <PetGrid>
    {[...Array(8)].map((_, i) => <PetCardSkeleton key={i} />)}
  </PetGrid>
) : ...}
```

---

## 2. Full-Resolution Images in the Grid (LCP)

**Problem**  
The grid was loading full-resolution images (often 2–5MB each) for every card, even though cards are ~300px wide on desktop. On load, 20 pets downloading at full resolution created a bandwidth wall.

**Before / After (sample Pexels image)**

| Format | Size |
|---|---|
| Original JPEG (full res) | ~1,009 KB |
| Grid thumbnail (WebP, 600px) | ~48 KB |
| Reduction | **~95%** |

**Solution**  
Grid cards request dynamically-sized WebP thumbnails via Pexels URL parameters:

```ts
const thumbnailUrl = `${baseUrl}?auto=format,compress&cs=tinysrgb&dpr=1&w=600&fit=max&q=80`;
```

The full 2400px high-res version is only requested when the user opens the detail modal.

---

## 3. Duplicate API Calls (Race Condition)

**Problem**  
Rapid scrolling triggered the Intersection Observer multiple times before the first `loadMore` call resolved. Each trigger started an independent fetch, resulting in duplicate pages being appended to the list.

**Root Cause**  
The guard was a React state boolean (`isFetchingMore`). State updates are asynchronous — multiple scroll triggers fired before the state change propagated, all reading `false` and proceeding.

**Solution**  
Replaced state with a `useRef`:

```ts
const isFetchingRef = useRef<boolean>(false);

const loadPets = useCallback(async (...) => {
  if (isFetchingRef.current) return; // synchronous, reads immediately
  isFetchingRef.current = true;
  // ... fetch
  isFetchingRef.current = false;
}, []);
```

A ref reads and writes synchronously. The second call sees `true` immediately and exits before any async work begins.

---

## 4. Infinite Scroll + Sort Conflict (Layout Thrashing)

**Problem**  
When a sort was applied mid-scroll, `useMemo` re-sorted the entire accumulated array. Items jumped to new positions. New infinite-scroll appends then pushed items further while the user was looking at a specific region. The experience was disorienting.

**Root Cause**  
Sorting requires the complete dataset to produce a stable order. Infinite scroll means the dataset is never complete. Applying both simultaneously is a fundamental conflict.

**Solution**  
Mode-switching architecture. Applying a sort freezes the feed. Clearing it commits the current sorted order to state before resuming — no positional jumps:

```ts
const handleResetSort = () => {
  setPets(filteredAndSortedPets); // lock current order
  setSortOrder('none');
  setTimeout(() => loadMore(), 0); // resume fetch
};
```

---

## 5. Context Re-Renders on Every Selection Toggle

**Problem**  
Selection state was stored in React Context. Every checkbox toggle caused the Context value to update, which re-rendered every component subscribed to that Context — including all 20+ pet cards simultaneously.

**Solution**  
Replaced React Context with `global-use-state`, which uses micro-subscriptions internally. Only the component that consumed the specific key that changed re-renders. Selecting one pet card no longer forces all other cards to reconcile.

---

## 6. Image Ghosting in Detail Modal Navigation

**Problem**  
Navigating between pets in the modal showed the previous image persisting until the new one finished loading. Fast navigation left the wrong image on screen for visible durations.

**Two-part solution:**

**Part A — Loading spinner**  
Reset `isImageLoading = true` immediately when `pet.url` changes. The previous image fades out and a spinner renders. The new image fades in via `onLoad`.

**Part B — Prefetching neighbors**  
When pet `N` is open, preload pets `N-1` and `N+1` in the background:

```ts
useEffect(() => {
  [nextPet, prevPet].forEach(neighbor => {
    if (!neighbor) return;
    const img = new Image();
    img.src = `${neighbor.url.split('?')[0]}?auto=compress&cs=tinysrgb&w=2400&dpr=2&fm=jpg`;
  });
}, [nextPet, prevPet]);
```

These land in the browser cache silently. The next navigation finds the image already loaded — `img.complete` is `true` on mount, the spinner is skipped, and the image appears instantly.

---

## 7. LCP Hint for First Image

**Problem**  
The browser had no signal to prioritize the first (largest) image in the gallery. It treated all images equally in its download queue.

**Solution**  
Pass `fetchpriority="high"` to the first card's image element. The browser promotes this request above the fold before processing the rest.

```tsx
fetchPriority={index === 0 ? 'high' : index < 8 ? 'auto' : 'low'}
loading={index < 8 ? 'eager' : 'lazy'}
```

Images below the fold use `loading="lazy"` — they don't request until the user scrolls near them.

---

## 8. DNS + TLS Cost for External Images (Pexels CDN)

**Problem**  
The first image loaded from `images.pexels.com` incurred a full DNS resolution + TLS handshake overhead before any bytes transferred.

**Solution**  
Added a `<link rel="preconnect">` in `index.html`:

```html
<link rel="preconnect" href="https://images.pexels.com" crossorigin />
```

The browser performs the handshake at parse time, before any image elements are in the DOM. When the first image request fires, the connection is already established.

---

## 9. Orphan Row on Initial Load (Visual Balance)

**Problem**  
The Eulerity API returned 21 pets. On a 4-column desktop grid, this produced 5 full rows plus 1 lone card on a 6th row. The layout looked unfinished.

**Solution**  
Slice the response to 20 items — producing a perfect 5×4 grid on initial load. Subsequent pages from Pexels add in groups of 4, maintaining the balanced layout.

---

## Summary

| Issue | Fix | Impact |
|---|---|---|
| Blank initial screen | Skeleton cards on mount | Eliminates CLS, improves perceived LCP |
| Full-res grid images | 600px WebP thumbnails | ~95% bandwidth reduction |
| Duplicate fetches | `useRef` guard over `useState` | Eliminates duplicates on rapid scroll |
| Sort + infinite conflict | Mode-switching architecture | Stable layout, no positional jumps |
| Context re-renders | `global-use-state` micro-subscriptions | O(1) re-renders per selection |
| Image ghosting in modal | Spinner + neighbor prefetch | Near-instant navigation on warm cache |
| LCP image priority | `fetchpriority="high"` + `loading="eager"` | Browser downloads hero image first |
| CDN connection overhead | `preconnect` in `index.html` | Removes DNS+TLS cost from first image |
| Orphan grid row | Slice Eulerity response to 20 | Balanced 5×4 initial layout |
