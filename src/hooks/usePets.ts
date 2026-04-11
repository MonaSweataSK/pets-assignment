import { useState, useEffect, useCallback, useRef } from 'react';
import type { Pet } from '../types/Pet';
import { fetchPets } from '../api/pets';

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isFetchingRef = useRef<boolean>(false);

  const loadPets = useCallback(async (pageNum: number, isInitial: boolean = false) => {
    if (isFetchingRef.current) return;
    
    try {
      isFetchingRef.current = true;
      if (isInitial) {
        setLoading(true);
      } else {
        setIsFetchingMore(true);
      }
      
      setError(null);
      const data = await fetchPets(pageNum);
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPets(prev => isInitial ? data : [...prev, ...data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Failed to load pets:', err);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
      isFetchingRef.current = false;
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadPets(1, true);
  }, [loadPets]);

  const loadMore = useCallback(() => {
    if (isFetchingMore || !hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadPets(nextPage);
  }, [page, isFetchingMore, hasMore, loading, loadPets]);

  return { 
    pets, 
    setPets,
    loading, 
    isFetchingMore, 
    error, 
    loadMore, 
    hasMore 
  };
};
