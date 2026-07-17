import fs from "fs";
import path from "path";

export interface Journey {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  stepsCount: number;
  estimatedTime: string;
  icon?: string;
  sections: {
    overview: {
      description: string;
      benefits?: string[];
    };
    checklist: Array<{
      id: number;
      title: string;
      description: string;
    }>;
    timeline?: Array<{
      day: string;
      title: string;
      tasks: string[];
    }>;
    documents?: Array<{
      name: string;
      description: string;
      url: string;
    }>;
    faqs?: Array<{
      q: string;
      a: string;
    }>;
    costs?: {
      description?: string;
      items: Array<{
        item: string;
        cost: string;
      }>;
    };
  };
}

const JOURNEYS_DIR = path.join(process.cwd(), "data", "journeys");

export function getAllJourneys(): Journey[] {
  const files = fs.readdirSync(JOURNEYS_DIR).filter((f) => f.endsWith(".json"));

  return files
    .map((file) => {
      const filePath = path.join(JOURNEYS_DIR, file);
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as Journey;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getJourneyBySlug(slug: string): Journey | null {
  const filePath = path.join(JOURNEYS_DIR, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Journey;
}

export function getJourneysByCategory(category: string): Journey[] {
  return getAllJourneys().filter((j) => j.category === category);
}

export function getCategories(): string[] {
  const journeys = getAllJourneys();
  return [...new Set(journeys.map((j) => j.category))].sort();
}
