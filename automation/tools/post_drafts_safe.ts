import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");        // automation/
const OUT  = path.resolve(ROOT, "out");
const SAFE = (process.env.SAFE_MODE ?? "true").toLowerCase() !== "false";

type Draft = { platform:string; text:string; title?:string; tags?:string[] };

function readJSON(p:string){ return JSON.parse(fs.readFileSync(p,"utf8")); }

function post(platform:string, draft:Draft){
  // For now: always log. Later, you can branch by platform and call APIs.
  const payload = {
    platform,
    title: draft.title,
    text: draft.text,
    tags: draft.tags,
    safe_mode: SAFE,
  };
  console.log("---- DRY RUN ----");
  console.log(JSON.stringify(payload, null, 2));
  console.log("-----------------\n");
}

function run(ep?:string){
  if(!fs.existsSync(OUT)){ console.error("No automation/out — generate drafts first."); process.exit(1); }
  const episodes = ep ? [ep] : fs.readdirSync(OUT).filter(d => fs.existsSync(path.join(OUT,d,"base.json")));

  if(episodes.length===0){ console.error("No episodes found under automation/out"); process.exit(1); }

  for (const id of episodes){
    const dir = path.join(OUT, id);
    if(!fs.existsSync(path.join(dir,"base.json"))) continue;
    console.log(`\n=== Episode ${id} (SAFE_MODE=${SAFE}) ===`);
    const plats = ["x","instagram","linkedin","youtube","facebook"];
    for (const p of plats){
      const file = path.join(dir, `${p}.json`);
      if (fs.existsSync(file)){
        const draft = readJSON(file) as Draft;
        post(p, draft);
      }
    }
  }
}

const ep = process.argv[2]; // optional
run(ep);
