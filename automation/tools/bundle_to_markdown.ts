import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");           // automation/
const OUT  = path.resolve(ROOT, "out");

function loadJSON(p: string) { return JSON.parse(fs.readFileSync(p, "utf8")); }

function bundleEpisode(epDir: string) {
  const base = loadJSON(path.join(epDir, "base.json"));
  const maybe = (name: string) => {
    const p = path.join(epDir, `${name}.json`);
    return fs.existsSync(p) ? loadJSON(p) : null;
  };

  const parts: string[] = [];
  parts.push(`# ${base.title}`);
  parts.push(`**Episode:** ${base.id}`);
  parts.push(`**Hook:** ${base.hook}`);
  if (base.cta) parts.push(`**CTA:** ${base.cta}`);
  if (base.themes?.length) parts.push(`**Themes:** ${base.themes.join(", ")}`);
  parts.push("");

  const order = ["instagram","x","linkedin","youtube","facebook"] as const;
  for (const plat of order) {
    const d = maybe(plat);
    if (!d) continue;
    parts.push(`## ${plat.toUpperCase()}`);
    if (d.title) parts.push(`**Title:** ${d.title}`);
    parts.push("");
    parts.push(d.text || "");
    if (d.tags?.length) {
      parts.push("");
      parts.push(`_Tags:_ ${d.tags.map((t:string)=> (t.startsWith("#")?t:`#${t.replace(/\s+/g,"")}`)).join(" ")}`);
    }
    parts.push("");
  }

  if (base.quotes?.length) {
    parts.push("## Quotes");
    for (const q of base.quotes) parts.push(`> ${q}`);
    parts.push("");
  }

  if (base.clips?.length) {
    parts.push("## Clips");
    for (const c of base.clips) {
      parts.push(`- ${c.start}-${c.end}${c.description ? ` — ${c.description}` : ""}`);
    }
    parts.push("");
  }

  const md = parts.join("\n").trim() + "\n";
  fs.writeFileSync(path.join(epDir, "drafts.md"), md, "utf8");
  console.log(`bundled → ${path.join(epDir, "drafts.md")}`);
}

function main() {
  const ep = process.argv[2]; // optional: specific episode id
  if (!fs.existsSync(OUT)) { console.error("No automation/out folder yet."); process.exit(1); }

  if (ep) {
    const dir = path.join(OUT, ep);
    if (!fs.existsSync(path.join(dir, "base.json"))) { console.error("Episode not found:", ep); process.exit(1); }
    bundleEpisode(dir);
    return;
  }

  // bundle all episodes with base.json
  const entries = fs.readdirSync(OUT, { withFileTypes: true }).filter(d=>d.isDirectory());
  for (const e of entries) {
    const dir = path.join(OUT, e.name);
    if (fs.existsSync(path.join(dir, "base.json"))) bundleEpisode(dir);
  }
}
main();
