// Change this public origin when connecting a custom domain.
export const SITE_URL = "https://badraddeen1.lovable.app";
export const AUTHOR_NAME = "بدرالدين الخامري";
export const WHATSAPP_NUMBER = "966568694883";
export const BLOG_PUBLISHED_AT = "2026-11-04";
export const BLOG_SLUGS = [
  "graduation-project-ideas", "graduation-project-documentation", "graduation-project-defense-questions",
  "website-cost", "start-online-store", "website-vs-online-store", "mobile-app-or-website",
  "custom-management-system", "hire-freelance-developer", "source-code-ownership",
] as const;
export function siteUrl(path = "/") { return `${SITE_URL}${path}`; }
export function projectInquiry(title: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`مرحباً مهندس بدرالدين، أريد طلب مشروع بخصوص: ${title}`)}`;
}