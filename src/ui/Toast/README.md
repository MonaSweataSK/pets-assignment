## Architecture notes

Unlike pure UI components (which should strictly avoid state management), the Toast system bundles both global state (`global-use-state`) and presentation logic into a single module. 

While keeping state out of UI components is a golden rule in React, **Toast Notification systems are a standard exception in the React ecosystem** (similar to popular libraries like `react-hot-toast` or `react-toastify`). 

We bundle state here for three core reasons:

1. **Encapsulation:** The rest of the application shouldn't need to know *how* toasts are queued, timed out, or garbage-collected. By keeping the global state array hidden inside the `Toast` module, consumers only interact with a clean `showToast('Hello')` API.
2. **Complex Internal Lifecycle:** Toasts require highly specific micro-lifecycles (generating IDs, queuing, animations, and overriding `setTimeout` cleanup). Extracting this into generic global state files (like `src/hooks/`) inevitably leaks unique UI-timing logic into the broader business data layer.
3. **Plug-and-Play Portability:** By bundling visual design and the queueing logic together, if the project ever extracts this into a shared component library or swaps it entirely, the entire appliance moves in one clean cut.

## How to use

1. Ensure the `<ToastRenderer />` is mounted exactly once near the root of your application (typically in `App.tsx`) to ensure highest `z-index` over child routes.
2. Under any child component, use the hook to trigger notifications:

```tsx
import { useToast } from '../ui/Toast/Toast';

export const MyComponent = () => {
    const { showToast } = useToast();

    const doSomething = () => {
        showToast('Operation successful!', { type: 'success', position: 'top-right' });
    }
}
```
