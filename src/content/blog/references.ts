export type ArticleReference = { title: string; url: string; note: string };
export const articleReferences: Record<string, ArticleReference[]> = {
  "graduation-project-ideas": [{ title: "دليل MDN لتطوير الويب", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", note: "مرجع لتعلم أساسيات الويب وتقييم المهارات المطلوبة لتنفيذ الفكرة." }],
  "graduation-project-documentation": [{ title: "المواصفات الرسمية للغة UML", url: "https://www.omg.org/spec/UML/", note: "مرجع لمعاني عناصر المخططات؛ يظل دليل الجامعة المرجع لتقسيم التقرير." }],
  "graduation-project-defense-questions": [{ title: "دليل OWASP لاختبار أمان تطبيقات الويب", url: "https://owasp.org/www-project-web-security-testing-guide/", note: "يساعد على تنظيم أسئلة الاختبارات الأمنية وحدود الأدلة المتاحة." }],
  "website-cost": [{ title: "دليل Google لأساسيات تحسين البحث", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ar", note: "يوضح ما تتضمنه تهيئة البحث عند مقارنة نطاقات عروض تطوير المواقع." }],
  "start-online-store": [{ title: "وثائق Stripe لاختبار المدفوعات", url: "https://docs.stripe.com/testing", note: "مثال رسمي لاختبارات الدفع؛ تحقق من دعم مزود الدفع لبلد نشاطك قبل اختياره." }],
  "website-vs-online-store": [{ title: "إرشادات Google لمواقع التجارة الإلكترونية", url: "https://developers.google.com/search/docs/specialty/ecommerce?hl=ar", note: "تشرح تنظيم معلومات المتجر وإتاحتها للبحث، وليس ضمان ظهور أو مبيعات." }],
  "mobile-app-or-website": [{ title: "دليل MDN لتطبيقات الويب التقدمية", url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps", note: "مرجع لإمكانات الويب القابل للتثبيت والعمل دون اتصال وحدود الدعم." }],
  "custom-management-system": [{ title: "إرشادات OWASP لتفويض الوصول", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html", note: "مرجع لتصميم صلاحيات المستخدمين والتحقق منها في الأنظمة الإدارية." }],
  "hire-freelance-developer": [{ title: "توثيق GitHub لنقل المستودعات", url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository", note: "مثال عملي لتسليم الوصول التقني؛ نقل المستودع وحده لا يحسم الحقوق التعاقدية." }],
  "source-code-ownership": [{ title: "تراخيص المصدر المفتوح لدى OSI", url: "https://opensource.org/licenses", note: "مرجع لفهم تراخيص المكونات؛ يحتاج تفسير التزامات مشروعك إلى مراجعة مناسبة." }],
};