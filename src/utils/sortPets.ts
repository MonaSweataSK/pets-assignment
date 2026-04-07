import type { Pet } from '../types/Pet';
import type { SortOption } from '../types/Sort';

export const sortPets = (pets: Pet[], sort: SortOption): Pet[] => {
  return [...pets].sort((a, b) => {
    switch (sort) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'date-asc':
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      case 'date-desc':
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      default:
        return 0;
    }
  });
};
