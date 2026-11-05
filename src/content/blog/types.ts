export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  subsections?: { title: string; paragraphs: string[] }[];
};
export type BlogArticle = {
  slug: string;
  title: string;
  keyword: string;
  seoTitle: string;
  description: string;
  intro: string;
  sections: ArticleSection[];
  faq: { question: string; answer: string }[];
  conclusion: string;
};
export function articleText(article: BlogArticle) {
  return [article.title, article.intro, ...article.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.subsections ?? []).flatMap(sub => [sub.title, ...sub.paragraphs])]), ...article.faq.flatMap(faq => [faq.question, faq.answer]), article.conclusion].join(" ").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
}
export function wordCount(article: BlogArticle) { return articleText(article).trim().split(/\s+/).length; }
export function readingMinutes(article: BlogArticle) { return Math.max(1, Math.ceil(wordCount(article) / 180)); }