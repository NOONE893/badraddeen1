<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the original site in `public/site.html` and make scoped CSS/behavior edits there to preserve its existing appearance.
- Route both project screenshot and preview-button clicks through the same in-page modal; keep its iframe sandbox limited to scripts, same-origin and forms to prevent top-level navigation and popups.
- Keep site interaction effects in the dedicated inline `interactiveEffects` script; use independent CSS rotation so tilt does not replace reveal/hover transforms, and honor reduced-motion preferences.
- Keep project inquiry links separate from preview triggers and derive their WhatsApp messages from each card's title; previews must remain in-page.
- Keep blog content in typed editorial data and render it in shared React blog views with route-level metadata, so article text and structured data stay consistent.
- Use `src/lib/site-config.ts` as the public domain source and regenerate the existing static sitemap/robots from it during Vite startup/build; use only actual editorial dates for lastmod.
- Keep the original homepage iframe untouched apart from requested navigation; blog routes use full server-rendered HTML and an explicit prerender list with automatic route discovery disabled.
