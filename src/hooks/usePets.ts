import { useState, useEffect } from 'react';
import type { Pet } from '../types/Pet';
import { fetchPets } from '../api/pets';

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
        
        const data = await fetchPets();
        
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
