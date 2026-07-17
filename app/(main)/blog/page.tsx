import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { getAllArticles, getBlogCategories, formatDate } from "@/lib/blog";

export const metadata = {
  title: "Blog - Próximo Passo",
  description: "Artigos, guias e orientações sobre as principais decisões da vida",
};

export default function BlogPage() {
  const articles = getAllArticles();
  const categories = getBlogCategories();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        {/* Hero Section */}
        <section className="py-16 sm:py-20">
          <div className="container-safe">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                Blog Próximo Passo
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Artigos, guias e orientações sobre as principais decisões e momentos importantes da vida
              </p>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                {articles.length} artigos disponíveis
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-slate-200 dark:border-slate-800 py-8">
          <div className="container-safe">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Todos os Artigos
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${category}`}
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 sm:py-20">
          <div className="container-safe">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Card
                  key={article.slug}
                  className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-200"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">
                          {article.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {article.readingTime} min de leitura
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      className="mt-6 w-full"
                    >
                      <Link href={`/blog/${article.slug}`}>
                        Ler Artigo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-safe py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; 2024 Próximo Passo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
