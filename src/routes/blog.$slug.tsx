import { createFileRoute, notFound, Link, useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { findArticle } from "@/content/blog/articles";
import { BlogArticlePage } from "@/components/blog-content";
import { BlogShell } from "@/components/blog-shell";
import { blogHead } from "@/lib/blog-meta";
import { Button } from "@/components/ui/button";

function ArticleError({ reset }: ErrorComponentProps) {
  const router = useRouter();
  return <BlogShell><div className="blog-container blog-intro"><h1>تعذّر عرض المقال</h1><Button onClick={() => { router.invalidate(); reset(); }}>حاول مرة أخرى</Button></div></BlogShell>;
}
function ArticleNotFound() {
  return <BlogShell><div className="blog-container blog-intro"><h1>المقال غير موجود</h1><Button asChild><Link to="/blog">العودة إلى المدونة</Link></Button></div></BlogShell>;
}
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => { const article = findArticle(params.slug); if (!article) throw notFound(); return article; },
  head: ({ loaderData }) => loaderData ? blogHead(loaderData) : { meta: [{ title: "مقال غير متاح | بدرالدين الخامري" }, { name: "robots", content: "noindex" }] },
  component: ArticlePage, errorComponent: ArticleError, notFoundComponent: ArticleNotFound,
});
function ArticlePage() { const article = Route.useLoaderData(); return <BlogArticlePage article={article} />; }