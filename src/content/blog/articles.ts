import type { BlogArticle } from "./types";
import { BLOG_SLUGS } from "@/lib/site-config";
const modules = import.meta.glob<{ default: BlogArticle[] }>("./*.json", { eager: true });
export const articles: BlogArticle[] = Object.values(modules).flatMap(module => module.default)
  .sort((a, b) => BLOG_SLUGS.indexOf(a.slug as typeof BLOG_SLUGS[number]) - BLOG_SLUGS.indexOf(b.slug as typeof BLOG_SLUGS[number]));
export function findArticle(slug: string) { return articles.find(article => article.slug === slug); }
export function articleCategory(article: BlogArticle) {
  if (article.slug.startsWith("graduation")) return "مشاريع التخرج";
  if (["custom-management-system", "hire-freelance-developer", "source-code-ownership"].includes(article.slug)) return "الأنظمة والتعاقد";
  return "المواقع والتطبيقات";
}
export function relatedArticles(article: BlogArticle) {
  return articles.filter(item => item.slug !== article.slug).sort((a, b) => Number(articleCategory(b) === articleCategory(article)) - Number(articleCategory(a) === articleCategory(article))).slice(0, 3);
}