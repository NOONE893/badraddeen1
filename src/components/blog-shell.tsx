import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun, ArrowUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AUTHOR_PHOTO } from "@/lib/blog-meta";
import { AUTHOR_NAME, projectInquiry } from "@/lib/site-config";

export function BlogShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const saved = () => document.cookie.match(/(?:^|; )siteTheme=([^;]*)/)?.[1];
    const apply = () => setDark(saved() ? saved() === "dark" : media.matches);
    apply();
    const scroll = () => setShowTop(window.scrollY > 500);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    media.addEventListener("change", apply);
    return () => { window.removeEventListener("scroll", scroll); media.removeEventListener("change", apply); };
  }, []);
  const toggle = () => {
    const next = !dark;
    document.cookie = `siteTheme=${next ? "dark" : "light"};max-age=31536000;path=/;SameSite=Lax`;
    setDark(next);
  };
  return <div className={`blog-site ${dark ? "dark" : ""}`} data-theme={dark ? "dark" : "light"} dir="rtl">
    <a className="blog-skip" href="#blog-main">تخطَّ إلى المحتوى</a>
    <header className="blog-navbar">
      <div className="blog-container blog-nav-inner">
        <Link to="/" className="blog-logo"><img src={AUTHOR_PHOTO} alt={AUTHOR_NAME} width="44" height="44" loading="lazy" /><span>{AUTHOR_NAME}</span></Link>
        <nav aria-label="القائمة الرئيسية" className="blog-nav-links">
          <Link to="/">الرئيسية</Link><Link to="/" hash="services">الخدمات</Link><Link to="/blog" aria-current="page">المدونة</Link>
        </nav>
        <div className="blog-nav-actions">
          <Button variant="ghost" size="icon" className="blog-theme-toggle" onClick={toggle} aria-label="تبديل الوضع الليلي والنهاري" title="تبديل الوضع الليلي والنهاري">{dark ? <Sun /> : <Moon />}</Button>
          <Button asChild className="blog-request"><a href={projectInquiry("مشروع جديد")} target="_blank" rel="noopener noreferrer">اطلب مشروعك</a></Button>
        </div>
      </div>
    </header>
    <main id="blog-main">{children}</main>
    <footer className="blog-footer"><div className="blog-container"><nav aria-label="روابط الفوتر"><Link to="/">الرئيسية</Link><Link to="/blog">المدونة</Link><Link to="/" hash="services">الخدمات</Link><a href={projectInquiry("مشروع جديد")} target="_blank" rel="noopener noreferrer" aria-label="واتساب"><MessageCircle size={20} /></a></nav><p>© {new Date().getUTCFullYear()} المهندس بدرالدين الخامري — جميع الحقوق محفوظة</p></div></footer>
    {showTop && <Button size="icon" className="blog-top" aria-label="العودة للأعلى" title="العودة للأعلى" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><ArrowUp /></Button>}
  </div>;
}