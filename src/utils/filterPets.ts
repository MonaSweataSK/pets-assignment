import type { Pet } from '../types/Pet';

export const filterPets = (pets: Pet[], query: string): Pet[] => {
  const normalised = query.trim().toLowerCase();
  if (!normalised) return pets;

  return pets.filter(
    (pet) =>
      pet.title.toLowerCase().includes(normalised) ||
      pet.description.toLowerCase().includes(normalised)
  );
};
