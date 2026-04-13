This directory contains the image selection logic for the application.

## SelectionContext.tsx

The `useSelection` hook is responsible for persisting the user's pet selections across different pages of the application (e.g., surviving navigation between the Home page, Pet Details page, etc.).

### Implementation: From Context to Global State

We previously used React's built-in Context API, but migrated to [`global-use-state`](https://www.npmjs.com/package/global-use-state) for better performance and simplicity.

**Why the change?**
-   **Micro-subscriptions (Key-Level)**: In standard Context, updating *any* global property (like a Toast) re-renders *all* consumers. With `global-use-state`, only components subscribed to the `selectedUrls` key re-render when selections change.
-   **Zero Provider Bloat**: There is no need to wrap the application in a `<SelectionProvider>`.

### The "List Problem" & Optimization
As noted during technical review, calling `useSelection()` inside every `PetCard` would still cause all 100+ cards to re-render whenever the selection set changes, because they all subscribe to the same key.

To achieve true performance efficiency, we use a **Lifted Subscription Pattern**:
1.  **Lift the State**: The parent grid (`Home.tsx`) subscribes to `selectedUrls`.
2.  **Memoize Children**: `PetCard` is wrapped in `React.memo`.
3.  **Pass Primitives**: The parent calculates `isSelected` (boolean) and `anySelected` (boolean) and passes them to each card.
4.  **Stable Callbacks**: The parent passes a stable `toggle` function from the context.

**Result**: When the selection changes, the parent re-renders, but `React.memo` prevents all 99+ unchanged cards from executing their render logic. Only the specific card that was toggled actually re-renders.

### State
The state tracks the selected pets by their `url` property. Using a `Set` ensures O(1) time complexity for lookups and ensures uniqueness.

### Custom Hook: `useSelection`
Components should consume the state via the `useSelection()` hook. It provides a clean, abstract API:

-   `selectedUrls`: (`Set<string>`) The active selection.
-   `select(url)`: Adds the specified URL to the selection.
-   `clear(url)`: Removes the specified URL from the selection.
-   `selectAll(pets)`: Selects all pets in the provided array.
-   `clearAll()`: Empties the selection.
-   `toggle(url)`: Toggles the selection status of a URL (stable reference).
-   `isSelected(url)`: Helper method returning `true` or `false` based on whether the `url` is selected.

---

*Note: The global state key `selectedUrls` is typed in `src/types/global.d.ts` for full TypeScript support.*
