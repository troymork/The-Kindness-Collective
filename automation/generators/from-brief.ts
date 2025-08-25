import fs from "fs";
import path from "path";
import { BaseDraft, PlatformDraft } from "../types";

function readBrief(): string {
  const a = path.resolve(process.cwd(), "automation/docs/show-brief.md");
  const b = path.resolve(process.cwd(), "docs/show-brief.md");
  if (fs.existsSync(a)) return fs.readFileSync(a, "utf8");
  if (fs.existsSync(b)) return fs.readFileSync(b, "utf8");
  console.error(`Missing brief. Create either:
- automation/docs/show-brief.md  OR
- docs/show-brief.md`);
  process.exit(1);
}

function parseBrief(md: string): BaseDraft {
  const grab = (label: string) =>
    (md.match(new RegExp(`^${label}:\\s*(.+)$`, "mi")) || [,""])[1].trim();
  const list = (label: string) =>
    (md.match(new RegExp(`^${label}:\\s*(.+)$`, "mi")) || [,""])[1]
      .split(",").map(s=>s.trim()).filter(Boolean);

  const clips: BaseDraft["clips"] = [];
  const clipRe = /^- clip:\s*(\d+)-(\d+)\s*(?:#\s*(.*))?$/gmi;
  for (const m of md.matchAll(clipRe)) clips.push({ start:+m[1], end:+m[2], description:(m[3]||"").trim() });

  const quotes: string[] = [];
  const quoteRe = /^> (.+)$/gmi;
  for (const m of md.matchAll(quoteRe)) quotes.push(m[1].trim());

  const base: BaseDraft = {
    id: grab("Episode"),
    title: grab("Title"),
    hook: grab("Hook"),
    themes: list("Themes"),
    cta: grab("CTA"),
    clips, quotes
  };
  if (!base.id || !base.title || !base.hook) {
    console.error("Brief missing required fields (Episode, Title, Hook).");
    process.exit(1);
  }
  return base;
}

function toX(d: BaseDraft): PlatformDraft {
  const q = d.quotes?.[0] ? `"${d.quotes[0]}"\n\n` : "";
  const tags = d.themes.slice(0,4).map(t=>"#"+t.replace(/\s+/g,"")).join(" ");
  return { platform:"x", text:`${d.hook}\n\n${q}${d.cta||""}\n\n${tags}`.trim() };
}
function toLinkedIn(d: BaseDraft): PlatformDraft {
  const text = `**${d.title}**\n\n${d.hook}\n\nWhat landed for you?\n${d.cta?`\n${d.cta}`:""}`.trim();
  return { platform:"linkedin", text, tags:d.themes.slice(0,5) };
}
function toInstagram(d: BaseDraft): PlatformDraft {
  const tags = d.themes.slice(0,10).map(t=>"#"+t.replace(/\s+/g,"")).join(" ");
  const text = `${d.hook}\n\n${d.quotes?.[0] ? `"${d.quotes[0]}"\n\n` : ""}${d.cta||""}\n\n${tags}`.trim();
  return { platform:"instagram", text };
}
function toYouTube(d: BaseDraft): PlatformDraft {
  return { platform:"youtube", title:d.title, text:`${d.hook}\n\n${d.cta||""}`.trim(), tags:d.themes.slice(0,10) };
}
function toFacebook(d: BaseDraft): PlatformDraft {
  return { platform:"facebook", text:`${d.hook}\n\n${d.cta||""}`.trim() };
}

function main() {
  const md = readBrief();
  const base = parseBrief(md);
  const outDir = path.resolve(process.cwd(), "automation/out", base.id);
  fs.mkdirSync(outDir, { recursive: true });
  const drafts = [toX(base), toLinkedIn(base), toInstagram(base), toYouTube(base), toFacebook(base)];
  fs.writeFileSync(path.join(outDir, "base.json"), JSON.stringify(base, null, 2));
  drafts.forEach(d => fs.writeFileSync(path.join(outDir, `${d.platform}.json`), JSON.stringify(d, null, 2)));
  console.log(`Drafts written to automation/out/${base.id}`);
}
main();
