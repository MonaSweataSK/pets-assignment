import { faker } from '@faker-js/faker';
import type { Pet } from '../types/Pet';

export const EULERITY_API_URL = 'https://eulerity-hackathon.appspot.com/pets';
export const PEXELS_SEARCH_URL = 'https://api.pexels.com/v1/search';
const PEXELS_API_KEY = 'jDlnG4wWdFzIhVofGfT7mMJ8dbkVUTE24q2izTb3ksjHymCMQ2dDvWEn';

/**
 * Fetches pet data from Eulerity and Pexels.
 * Page 1 fetches from Eulerity.
 * Subsequent pages fetch from Pexels with the search term 'pets'.
 */
export const fetchPets = async (page: number = 1, limit: number = 4): Promise<Pet[]> => {
  try {
    if (page === 1) {
      // Initially fetch from Eulerity API
      const response = await fetch(EULERITY_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch pets from Eulerity: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      
      if (!Array.isArray(json)) {
        console.error('Invalid Eulerity response structure:', json);
        return [];
      }

      // Eulerity returns all pets at once, we map them to our Pet interface
      // We trim to 20 to keep a perfectly balanced 5x4 grid
      return json.slice(0, 20).map((item: any) => ({
        title: item.title || 'Pet',
        description: item.description || 'A beautiful pet photo.',
        url: item.url || '',
        created: item.created || new Date().toISOString()
      })).filter(pet => pet.url !== '');
      
    } else {
      // Subsequent loads fetch from Pexels to imitate infinite scroll
      // We map our page number to Pexels page (starts from its page 1 on our page 2)
      const pexelsPage = page - 1;
      const response = await fetch(`${PEXELS_SEARCH_URL}?query=pets&per_page=${limit}&page=${pexelsPage}`, {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from Pexels: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      
      if (!json || !Array.isArray(json.photos)) {
        return [];
      }

      // Pexels doesn't provide pet-specific titles/descriptions, so we use faker
      return json.photos.map((item: any) => {
        const animalType = faker.animal.type();
        return {
          title: `${faker.person.firstName()}'s ${animalType.charAt(0).toUpperCase() + animalType.slice(1)}`,
          description: faker.lorem.sentence(),
          url: item.src.large,
          created: faker.date.recent().toISOString()
        };
      });
    }
  } catch (error) {
    console.error('Error fetching pet data:', error);
    throw error;
  }
};
