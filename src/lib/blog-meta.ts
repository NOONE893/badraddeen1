import coverAsset from "@/assets/blog-workspace.asset.json";
import authorAsset from "@/assets/badr-author.asset.json";
import { AUTHOR_NAME, BLOG_PUBLISHED_AT, siteUrl } from "./site-config";
import type { BlogArticle } from "@/content/blog/types";
import { articleImage } from "./blog-images";

export const BLOG_COVER = siteUrl(coverAsset.url);
export const AUTHOR_PHOTO = siteUrl(authorAsset.url);
export const BLOG_DESCRIPTION = "مقالات بدرالدين الخامري عن مشاريع التخرج وتصميم المواقع والمتاجر والتطبيقات والأنظمة الإدارية، مع أدلة عملية تساعدك على التخطيط واختيار الحل المناسب لمشروعك.";
function breadcrumbs(title?: string, slug?: string) {
  const items = [{ name: "الرئيسية", item: siteUrl() }, { name: "المدونة", item: siteUrl("/blog") }];
  if (title && slug) items.push({ name: title, item: siteUrl(`/blog/${slug}`) });
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })) };
}
export function blogHead(article?: BlogArticle) {
  const title = article?.seoTitle ?? "المدونة | بدرالدين الخامري";
  const description = article?.description ?? BLOG_DESCRIPTION;
  const url = siteUrl(article ? `/blog/${article.slug}` : "/blog");
  const image = article ? articleImage(article) ?? BLOG_COVER : BLOG_COVER;
  const schemas: object[] = [breadcrumbs(article?.title, article?.slug)];
  if (article) schemas.push({
    "@context": "https://schema.org", "@type": "Article", headline: article.title,
    description, image: [image], datePublished: BLOG_PUBLISHED_AT, dateModified: BLOG_PUBLISHED_AT,
    author: { "@type": "Person", name: AUTHOR_NAME, url: siteUrl(), image: AUTHOR_PHOTO },
    mainEntityOfPage: { "@type": "WebPage", "@id": url }, inLanguage: "ar",
  }, {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: article.faq.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  });
  else schemas.push({ "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url, inLanguage: "ar" });
  return {
    meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:url", content: url }, { property: "og:type", content: article ? "article" : "website" },
      { property: "og:locale", content: "ar_SA" }, { property: "og:site_name", content: AUTHOR_NAME },
      { property: "og:image", content: image }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: article?.title ?? "مساحة عمل لتخطيط وبرمجة المواقع والمشاريع" },
      { name: "twitter:card", content: "summary_large_image" }, { name: "twitter:title", content: title },
      { name: "twitter:description", content: description }, { name: "twitter:image", content: image },
      ...(article ? [{ property: "article:published_time", content: BLOG_PUBLISHED_AT }, { name: "keywords", content: article.keyword }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schemas.map(schema => ({ type: "application/ld+json", children: JSON.stringify(schema) })),
  };
}