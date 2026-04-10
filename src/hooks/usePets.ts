import { useState, useEffect } from 'react';
import type { Pet } from '../types/Pet';
import { fetchPets } from '../api/pets';

// Hoist the fetch call to the module level so it fires immediately when the JS bundle is parsed,
// rather than waiting for the React component tree to mount. This significantly improves LCP.
const petsPromise = fetchPets();

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPets = async () => {
      try {
        setLoading(true);
        setError(null);

        // Await the pre-fetched promise
        const data = await petsPromise;

        if (isMounted) {
          setPets(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPets();

    return () => {
      isMounted = false;
    };
  }, []);

  return { pets, loading, error };
};
