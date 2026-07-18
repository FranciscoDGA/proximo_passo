import fs from "fs";
import path from "path";

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "data", "blog");

export function getAllArticles(): BlogArticle[] {
  const filePath = path.join(BLOG_DIR, "articles.json");

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const articles = JSON.parse(content) as BlogArticle[];

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): BlogArticle | null {
  const articles = getAllArticles();
  return articles.find((a) => a.slug === slug) || null;
}

export function getArticlesByCategory(category: string): BlogArticle[] {
  const articles = getAllArticles();
  return articles.filter((a) => a.category === category);
}

export function getBlogCategories(): string[] {
  const articles = getAllArticles();
  const categories = [...new Set(articles.map((a) => a.category))];
  return categories.sort();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
