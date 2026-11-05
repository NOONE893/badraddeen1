import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Clock3, CalendarDays, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogShell } from "./blog-shell";
import { articles, articleCategory, relatedArticles } from "@/content/blog/articles";
import { readingMinutes, type BlogArticle } from "@/content/blog/types";
import { AUTHOR_NAME, BLOG_PUBLISHED_AT, projectInquiry } from "@/lib/site-config";
import { AUTHOR_PHOTO, BLOG_COVER } from "@/lib/blog-meta";
import { articleImage } from "@/lib/blog-images";
import { articleReferences } from "@/content/blog/references";

const dateLabel = new Intl.DateTimeFormat("ar", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${BLOG_PUBLISHED_AT}T12:00:00Z`));
export function ArticleMeta({ article }: { article: BlogArticle }) {
  return <div className="blog-meta"><span><CalendarDays size={15} /><time dateTime={BLOG_PUBLISHED_AT}>{dateLabel}</time></span><span><Clock3 size={15} />{readingMinutes(article)} دقائق قراءة</span></div>;
}
function Breadcrumbs({ article }: { article?: BlogArticle }) {
  return <nav aria-label="مسار الصفحة" className="blog-breadcrumbs"><Link to="/">الرئيسية</Link><ChevronLeft size={14} />{article ? <><Link to="/blog">المدونة</Link><ChevronLeft size={14} /><span aria-current="page">{article.title}</span></> : <span aria-current="page">المدونة</span>}</nav>;
}
function ReadButton({ article }: { article: BlogArticle }) {
  return <Button variant="outline" asChild className="blog-read"><Link to="/blog/$slug" params={{ slug: article.slug }} aria-label={`اقرأ المقال: ${article.title}`}>اقرأ المقال<ArrowLeft size={16} /></Link></Button>;
}
function ArticleCard({ article, related = false }: { article: BlogArticle; related?: boolean }) {
  const Heading = related ? "h3" : "h2";
  return <article className="blog-card"><Link to="/blog/$slug" params={{ slug: article.slug }}><img className="blog-card-cover" src={articleImage(article)} alt={article.title} width="1200" height="630" loading="lazy" /></Link><span className="blog-card-category">{articleCategory(article)}</span><Heading><Link to="/blog/$slug" params={{ slug: article.slug }}>{article.title}</Link></Heading><p className="blog-card-summary">{article.description}</p><ArticleMeta article={article} /><ReadButton article={article} /></article>;
}
export function BlogIndexPage() {
  const featured = articles[0];
  return <BlogShell><div className="blog-container"><div className="blog-intro"><Breadcrumbs /><p className="blog-eyebrow">بدرالدين الخامري · مهندس برمجيات</p><h1>المدونة</h1><p>أدلة عملية لمشاريع التخرج والمواقع والمتاجر والتطبيقات، من اختيار الفكرة إلى التوثيق والتسليم.</p></div>{featured && <section className="blog-feature" aria-label="مقال مختار"><Link to="/blog/$slug" params={{ slug: featured.slug }}><img className="blog-cover" src={BLOG_COVER} width="1200" height="630" loading="lazy" alt="حاسوب ودفتر مخططات لتخطيط مشروع برمجي" /></Link><div><span className="blog-card-category">{articleCategory(featured)}</span><h2><Link to="/blog/$slug" params={{ slug: featured.slug }}>{featured.title}</Link></h2><ArticleMeta article={featured} /><p>{featured.description}</p><ReadButton article={featured} /></div></section>}<section aria-labelledby="all-articles"><h2 id="all-articles" className="blog-section-title">جميع المقالات</h2><div className="blog-grid">{articles.map(article => <ArticleCard key={article.slug} article={article} />)}</div></section></div></BlogShell>;
}

// Editorial links are restricted to known article routes and the original services section.
function InlineText({ text }: { text: string }) {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes = [];
  let offset = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    nodes.push(text.slice(offset, index));
    const [, label, path] = match;
    if (path === "/#services") nodes.push(<Link key={index} to="/" hash="services">{label}</Link>);
    else {
      const linked = articles.find(article => `/blog/${article.slug}` === path);
      nodes.push(linked ? <Link key={index} to="/blog/$slug" params={{ slug: linked.slug }}>{label}</Link> : label);
    }
    offset = index + match[0].length;
  }
  nodes.push(text.slice(offset));
  return <>{nodes}</>;
}
export function BlogArticlePage({ article }: { article: BlogArticle }) {
  return <BlogShell><article className="blog-container blog-article"><Breadcrumbs article={article} /><p className="blog-eyebrow">{articleCategory(article)}</p><h1>{article.title}</h1><div className="blog-author"><img src={AUTHOR_PHOTO} width="48" height="48" loading="lazy" alt={`صورة الكاتب ${AUTHOR_NAME}`} /><div><strong>{AUTHOR_NAME} · مهندس برمجيات</strong><ArticleMeta article={article} /></div></div><img src={articleImage(article)} className="blog-cover" width="1200" height="630" loading="lazy" alt={article.title} /><div className="blog-prose"><p><InlineText text={article.intro} /></p><nav className="blog-toc" aria-label="فهرس محتويات المقال"><h2>فهرس المحتويات</h2><ol>{article.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}<li><a href="#conclusion">الخلاصة</a></li><li><a href="#questions">أسئلة شائعة</a></li></ol></nav>{article.sections.map(section => <section key={section.id}><h2 id={section.id}>{section.title}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}><InlineText text={paragraph} /></p>)}{section.subsections?.map((sub, index) => <Fragment key={index}><h3>{sub.title}</h3>{sub.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}><InlineText text={paragraph} /></p>)}</Fragment>)}</section>)}<section><h2 id="conclusion">الخلاصة</h2><p><InlineText text={article.conclusion} /></p></section><section className="blog-references"><h2>مراجع وروابط مفيدة</h2><ul>{(articleReferences[article.slug] ?? []).map(reference => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.title}</a><small>{reference.note}</small></li>)}</ul></section><section className="blog-faq" aria-labelledby="questions"><h2 id="questions">أسئلة شائعة</h2>{article.faq.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section></div><aside className="blog-project-cta"><h2 className="blog-section-title">اطلب مشروعك</h2><p>ناقش معي فكرة مشروعك، لنحدّد احتياجاته ونطاق العمل والخطوة التالية.</p><Button asChild><a href={projectInquiry(article.title)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />اطلب مشروعك</a></Button></aside><section className="blog-related" aria-labelledby="related"><h2 id="related" className="blog-section-title">مقالات ذات صلة</h2><div className="blog-grid">{relatedArticles(article).map(related => <ArticleCard key={related.slug} article={related} related />)}</div></section></article></BlogShell>;
}