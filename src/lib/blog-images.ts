import type { BlogArticle } from "@/content/blog/types";
import { siteUrl } from "./site-config";
const pointers = import.meta.glob<{ default: { url: string } }>("../assets/*.asset.json", { eager: true });
export function articleImage(article: BlogArticle) {
  const pointer = pointers[`../assets/${article.slug}.asset.json`];
  return pointer ? siteUrl(pointer.default.url) : undefined;
}