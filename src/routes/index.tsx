import { createFileRoute, useLocation } from "@tanstack/react-router";
import { siteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "المهندس بدرالدين الخامري | تصميم وبرمجة مواقع وتطبيقات ومشاريع تخرج" },
      { name: "description", content: "بدرالدين الخامري، مهندس برمجيات لتصميم وبرمجة المواقع والمتاجر الإلكترونية وتطبيقات الجوال والأنظمة الإدارية ومشاريع التخرج، من الفكرة حتى التسليم." },
      { property: "og:title", content: "المهندس بدرالدين الخامري | من الفكرة إلى التطبيق" },
      { property: "og:description", content: "بدرالدين الخامري، مهندس برمجيات لتصميم وبرمجة المواقع والمتاجر الإلكترونية وتطبيقات الجوال والأنظمة الإدارية ومشاريع التخرج، من الفكرة حتى التسليم." },
      { name: "keywords", content: "بدرالدين الخامري, المهندس بدرالدين الخامري, تصميم مواقع, برمجة مواقع, تطوير تطبيقات جوال, برمجة مشاريع تخرج, أنظمة إدارية, تصميم متاجر إلكترونية, مهندس برمجيات" },
      { name: "twitter:title", content: "المهندس بدرالدين الخامري | تصميم وبرمجة مواقع وتطبيقات ومشاريع تخرج" },
      { name: "twitter:description", content: "تصميم وبرمجة المواقع والمتاجر الإلكترونية وتطبيقات الجوال والأنظمة الإدارية ومشاريع التخرج، من الفكرة حتى التسليم." },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "بدرالدين الخامري" },
      { property: "og:url", content: siteUrl() },
      { property: "og:locale", content: "ar_AR" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: siteUrl() }],
  }),
  component: Index,
});

function Index() {
  const hash = useLocation({ select: location => location.hash });
  return (
    <iframe
      src={hash ? `/site.html#${hash}` : "/site.html"}
      title="بدرالدين الخامري"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}
