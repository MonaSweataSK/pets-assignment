import type { Pet } from '../types/Pet';

import { API_URL } from '../constants';

export const fetchPets = async (): Promise<Pet[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch pets: ${response.status} ${response.statusText}`);
    }

    const data: Pet[] = await response.json();
    
    // Optimize URLs for better performance (WebP + Compression)
    // Using w=1000 as a balance between gallery grid performance and detail page quality
    const optimizedData = data.map(pet => {
      const baseUrl = pet.url.split('?')[0];
      const optimizedUrl = `${baseUrl}?auto=compress&cs=tinysrgb&fm=webp&w=1000`;
      return { ...pet, url: optimizedUrl };
    });

    return optimizedData;
  } catch (error) {
    console.error('Error pulling pet data:', error);
    throw error;
  }
};
