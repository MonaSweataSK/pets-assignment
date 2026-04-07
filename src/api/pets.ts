import type { Pet } from '../types/Pet';

import { API_URL } from '../constants';

export const fetchPets = async (): Promise<Pet[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch pets: ${response.status} ${response.statusText}`);
    }

    const data: Pet[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error pulling pet data:', error);
    throw error;
  }
};
