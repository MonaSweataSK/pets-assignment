
## Custom Hooks
## `usePets()`

The `usePets` hook acts as the primary data-fetching controller for the application. It requests the master payload from the external Eulerity Hackathon API and safely exposes it to the React tree.

### Core Architecture

- **Hoisting for Performance (LCP)**: The underlying `fetchPets()` Promise is initiated at the **module-scope** (outside the React component). This aggressively triggers the network fetch the millisecond the JavaScript bundle validates, entirely bypassing React's mount lifecycle delays. This drastically improves overall LCP (Largest Contentful Paint).
- **Safe Mount Tracking**: Uses an `isMounted` ref-tracker inside the `useEffect` to safely resolve asynchronous operations without leaking state or causing warnings if the component is unmounted prematurely.

### Usage

```
import { usePets } from '../hooks/usePets';

const MyGallery = () => {
    // The hook exposes a clean tuple of the data, the loading state, and potential errors
    const { pets, loading, error } = usePets();

    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error} />;

    return <Gallery payload={pets} />;
}
```
