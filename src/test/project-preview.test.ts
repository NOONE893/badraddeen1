import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { afterEach, describe, expect, it } from "vitest";

const site = readFileSync("public/site.html", "utf8");
const windows: JSDOM[] = [];
function setup() {
  const dom = new JSDOM(site, { url: "http://localhost:8080/site.html", runScripts: "outside-only" });
  windows.push(dom);
  const scripts = dom.window.document.querySelectorAll("script");
  dom.window.eval(scripts[scripts.length - 1]?.textContent ?? "");
  return dom.window;
}
afterEach(() => { windows.splice(0).forEach(dom => dom.window.close()); });

describe("Project preview behavior", () => {
  for (const [title, url] of [
    ["Qeran", "https://qeran.lovable.app/"],
    ["حراج عرطة", "https://a3rta.lovable.app/"],
    ["Jawdawa", "https://jawdawa.lovable.app/"],
  ]) {
    it(`opens ${title} in the same modal from either control`, () => {
      const window = setup();
      const document = window.document;
      const frame = document.querySelector<HTMLIFrameElement>("#previewFrame");
      for (const trigger of document.querySelectorAll<HTMLButtonElement>(`[data-title="${title}"]`)) {
        trigger.click();
        expect(frame?.src).toBe(url);
        expect(document.body.style.overflow).toBe("hidden");
        document.querySelector<HTMLButtonElement>("#previewClose")?.click();
        expect(frame?.src).toBe("about:blank");
        expect(document.activeElement).toBe(trigger);
      }
    });
  }
  it("restricts iframe capabilities to scripts, same-origin and forms", () => {
    const frame = setup().document.querySelector("#previewFrame");
    expect(frame?.getAttribute("sandbox")?.split(/\s+/).sort()).toEqual([
      "allow-forms", "allow-same-origin", "allow-scripts",
    ]);
  });
  for (const action of ["Escape", "outside", "close"] as const) {
    it(`closes with ${action} and restores scrolling`, () => {
      const window = setup();
      const document = window.document;
      document.body.style.overflow = "auto";
      document.querySelector<HTMLButtonElement>(".shot-link")?.click();
      if (action === "Escape") document.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape" }));
      else document.querySelector<HTMLElement>(action === "outside" ? "#previewModal" : "#previewClose")?.click();
      expect(document.querySelector<HTMLIFrameElement>("#previewFrame")?.src).toBe("about:blank");
      expect(document.body.style.overflow).toBe("auto");
    });
  }
});