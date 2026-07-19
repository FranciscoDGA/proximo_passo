import { mockJourneys, MockJourney } from "./mock-data";

export interface Journey extends MockJourney {}

export function getAllJourneys(): Journey[] {
  return mockJourneys;
}

export function getJourneyBySlug(slug: string): Journey | undefined {
  return mockJourneys.find((journey) => journey.slug === slug);
}

export function getJourneysByCategory(category: string): Journey[] {
  return mockJourneys.filter((journey) => journey.category === category);
}
