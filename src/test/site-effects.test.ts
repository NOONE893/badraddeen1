import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

describe("Site interaction accessibility", () => {
  it("keeps the original role static when reduced motion is requested", () => {
    const dom = new JSDOM(readFileSync("public/site.html", "utf8"), { runScripts: "outside-only" });
    const window = dom.window;
    const role = window.document.querySelector(".profile-card .role");
    const original = role?.textContent;
    let scheduledTimers = 0;
    Object.defineProperty(window, "matchMedia", { value: (query: string) => ({
      matches: query.includes("prefers-reduced-motion"), addEventListener() {},
    }) });
    Object.defineProperty(window, "setTimeout", { value: () => { scheduledTimers++; return 1; } });
    window.eval(window.document.querySelector("#interactiveEffects")?.textContent ?? "");
    expect(role?.textContent).toBe(original);
    expect(scheduledTimers).toBe(0);
    dom.window.close();
  });
});