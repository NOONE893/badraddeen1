import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

describe("Project WhatsApp inquiries", () => {
  for (const title of ["Qeran", "حراج عرطة", "Jawdawa"]) {
    it(`addresses the existing number with the selected project ${title}`, () => {
      const dom = new JSDOM(readFileSync("public/site.html", "utf8"), { runScripts: "outside-only" });
      Object.defineProperty(dom.window, "matchMedia", { value: () => ({ matches: true, addEventListener() {} }) });
      dom.window.eval(dom.window.document.querySelector("#interactiveEffects")?.textContent ?? "");
      const card = [...dom.window.document.querySelectorAll(".project-card")].find(card => card.querySelector(".project-title")?.textContent === title);
      const href = card?.querySelector<HTMLAnchorElement>(".project-request")?.href;
      expect(href).toBeDefined();
      const url = new URL(href ?? "https://invalid.example");
      expect(url.origin + url.pathname).toBe("https://wa.me/966568694883");
      expect(url.searchParams.get("text")).toBe(`أريد مشروعاً مثل هذا: ${title}`);
      dom.window.close();
    });
  }
});