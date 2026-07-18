'use server';

import { getAllJourneys } from '@/lib/journeys';

export async function getJourneysAction() {
  try {
    return getAllJourneys();
  } catch (error) {
    console.error('Error fetching journeys:', error);
    throw new Error('Failed to fetch journeys');
  }
}
