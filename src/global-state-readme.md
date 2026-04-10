# Global State Management

This project uses [`global-use-state`](https://www.npmjs.com/package/global-use-state) to manage global frontend configurations and shared data, bypassing the native React Context API entirely. 

This brings several benefits:
- **Zero Component Nesting**: No need for `<Providers>` wrapping the root tree.
- **Micro-subscriptions**: Updating state won't forcefully re-render components unless they uniquely subscribe to the varied state key, improving general efficiency.
- **Predictable Types**: Seamless adherence to Typescript definitions.

---

## Usage Guide

Using shared global state is practically identical to using standard React `useState`. 

```tsx
import { useGlobalState } from 'global-use-state';

export const MyComponent = () => {
    // Treat this exactly like React.useState, except the value is shared universally!
    const [selectedUrls, setSelectedUrls] = useGlobalState('selectedUrls', new Set());

    const handleClick = () => {
        // Standard State updates work flawlessly
        setSelectedUrls((prev) => new Set([...prev, 'new-url']));
    };

    return <button onClick={handleClick}>{selectedUrls.size} Image(s)</button>;
}
```

### Reading outside of React

If you need to sync changes from a general Utility or Service layer outside of the render cycle, do this via simple functions:

```ts
import { getGlobalState, setGlobalState } from 'global-use-state';

// Synchronous fetch of current state
const allUrls = getGlobalState('selectedUrls');

// Push updates directly
setGlobalState('selectedUrls', new Map());
```

## Adding New Types

This project maps all `global-use-state` configurations safely via ambient typing. If you need a new global variable in your application, you **must register it first**.

1. Open `src/types/global.d.ts`
2. Add your new variable strictly typed:

```ts
import 'global-use-state';

declare module 'global-use-state' {
  interface GlobalState {
    selectedUrls: Set<string>;
    toasts: ToastMessage[];
    myNewDataFlag: boolean; // <-- Add your new configuration!
  }
}
```

VS Code IntelliSense will now natively suggest and enforce correct typings everywhere `useGlobalState` is utilized.
