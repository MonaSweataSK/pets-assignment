import { useGlobalState } from 'global-use-state';
import type { Pet } from '../types/Pet';

export const useSelection = () => {
  const [selectedUrls, setSelectedUrls] = useGlobalState('selectedUrls', new Set());

  const select = (url: string) => {
    setSelectedUrls((prev) => new Set([...prev, url]));
  };

  const clear = (url: string) => {
    setSelectedUrls((prev) => {
      const next = new Set(prev);
      next.delete(url);
      return next;
    });
  };

  const selectAll = (pets: Pet[]) => {
    setSelectedUrls(new Set(pets.map(p => p.url)));
  };

  const clearAll = () => {
    setSelectedUrls(new Set());
  };

  const isSelected = (url: string) => selectedUrls.has(url);

  return { selectedUrls, select, clear, selectAll, clearAll, isSelected };
};
