import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getArticleBySlug, getAllArticles, formatDate } from "@/lib/blog";
import { markdownToHtml } from "@/lib/utils";

interface BlogArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Artigo não encontrado" };

  return {
    title: `${article.title} - Próximo Passo`,
    description: article.description,
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const articles = getAllArticles();
  const relatedArticles = articles
    .filter(
      (a) => a.category === article.category && a.slug !== article.slug
    )
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        {/* Breadcrumb */}
        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="container-safe py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para Blog
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 sm:py-16">
          <div className="container-safe max-w-3xl">
            <div className="space-y-4">
              <Badge>{article.category}</Badge>

              <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
                {article.title}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300">
                {article.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readingTime} minutos de leitura</span>
                </div>
                <div>Por {article.author}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container-safe max-w-3xl">
            <article className="prose prose-slate max-w-none dark:prose-invert space-y-4">
              <div
                dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
                className="space-y-4 text-slate-700 dark:text-slate-300"
              />
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-slate-200 dark:border-slate-800 py-12 bg-primary">
          <div className="container-safe max-w-3xl text-center text-white">
            <h2 className="text-3xl font-bold">Quer aprofundar neste tema?</h2>
            <p className="mt-2 text-lg opacity-90">
              Explore nossa jornada relacionada para receber um guia completo
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-6"
              asChild
            >
              <Link href="/journeys">Ver Todas as Jornadas</Link>
            </Button>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12">
            <div className="container-safe max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
                Artigos Relacionados
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((relatedArticle) => (
                  <Card
                    key={relatedArticle.slug}
                    className="flex flex-col overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="p-6">
                      <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {relatedArticle.description}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mt-4"
                      >
                        <Link href={`/blog/${relatedArticle.slug}`}>
                          Ler Mais
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-safe py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>&copy; 2024 Próximo Passo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
