import { describe, expect, it } from "vitest";
import { articles } from "@/content/blog/articles";
import { readingMinutes, wordCount } from "@/content/blog/types";
import { BLOG_SLUGS, projectInquiry } from "@/lib/site-config";
describe("Blog editorial rules", () => {
  it("has the ten requested independent article addresses", () => {
    expect(articles.map(article => article.slug)).toEqual([...BLOG_SLUGS]);
  });
  for (const slug of BLOG_SLUGS) {
    it(`${slug} has 900–1300 words`, () => {
      const article = articles.find(item => item.slug === slug);
      expect(article).toBeDefined();
      if (!article) return;
      expect(wordCount(article)).toBeGreaterThanOrEqual(900);
      expect(wordCount(article)).toBeLessThanOrEqual(1300);
      expect(readingMinutes(article)).toBe(Math.ceil(wordCount(article) / 180));
    });
    it(`${slug} has exactly three FAQ entries and two other article references`, () => {
      const article = articles.find(item => item.slug === slug);
      expect(article?.faq.length).toBe(3);
      const links = [...JSON.stringify(article).matchAll(/\]\(\/blog\/([^)]*)\)/g)].map(match => match[1]);
      expect(new Set(links.filter(link => link !== slug)).size).toBeGreaterThanOrEqual(2);
      for (const link of links) expect([...BLOG_SLUGS]).toContain(link);
    });
  }
  it("addresses the existing WhatsApp number with the selected article", () => {
    const url = new URL(projectInquiry("مشروع متجر"));
    expect(url.origin + url.pathname).toBe("https://wa.me/966568694883");
    expect(url.searchParams.get("text")).toBe("مرحباً مهندس بدرالدين، أريد طلب مشروع بخصوص: مشروع متجر");
  });
});