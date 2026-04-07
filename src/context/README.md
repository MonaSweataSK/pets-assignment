This directory contains global state management for the application using React Context API and useReducer

## SelectionContext.tsx

The `SelectionContext` is responsible for persisting the user's pet selections across different pages of the application (e.g., surviving navigation between the Home page, Pet Details page, etc.). 

We chose React's built-in Context API and `useReducer` over external libraries like Redux or Zustand because the app's state requirements are relatively simple, and introducing a heavy library was unnecessary for this use-case.

### State
The state tracks the selected pets by their `url` property (which acts as a unique identifier since the pets API structure doesn't provide an `id`). Using a `Set` makes lookups and adding/removing O(1) time complexity.
```ts
interface SelectionState {
  selectedUrls: Set<string>;
}
```

### Actions
State mutations are localized to a reducer supporting four actions:
- `SELECT`: Appends a specific pet's URL to the `Set`.
- `CLEAR`: Removes a specific pet's URL from the `Set`.
- `SELECT_ALL`: Accepts an array of pet URLs and assigns them to the selection `Set` (typically used to select all currently loaded pets).
- `CLEAR_ALL`: Clears the entire selection `Set`.

### Custom Hook: `useSelection`
Components should consume the context via the `useSelection()` hook. It abstracts away the context handling and `dispatch` calls, providing a clean API:

- `selectedUrls`: (`Set<string>`) The active selection.
- `select(url)`: Adds the specified URL to the selection.
- `clear(url)`: Removes the specified URL from the selection.
- `selectAll(pets)`: Dispatches the `SELECT` action for all pets provided (extracting their URLs internally).
- `clearAll()`: Empties the selection.
- `isSelected(url)`: A helper method returning `true` or `false` based on whether the `url` exists in the `selectedUrls` set.

