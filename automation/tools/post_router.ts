import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ENABLE, SAFE_MODE } from "../config";



const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");       // automation/
const OUT  = path.resolve(ROOT, "out");



function readJSON(p: string){ return JSON.parse(fs.readFileSync(p, "utf8")); }

async function main(){
  const episode = process.argv[2]; // optional
  const targets = episode ? [episode] : fs.readdirSync(OUT).filter(d => fs.existsSync(path.join(OUT,d,"base.json")));
  if (targets.length === 0) { console.error("No drafts found. Generate first."); process.exit(1); }

  for (const id of targets){
    const dir = path.join(OUT, id);
    console.log(`\n=== ROUTE episode ${id} (SAFE_MODE=${SAFE_MODE}) ===`);

    if (ENABLE.x && fs.existsSync(path.join(dir,"x.json"))){
      const { postX } = await import("../adapters/x_post.js");
      postX(readJSON(path.join(dir,"x.json")), { safe: SAFE_MODE });
    } else { console.log("[-] X disabled or missing draft."); }

    if (ENABLE.instagram && fs.existsSync(path.join(dir,"instagram.json"))){
      const { postInstagram } = await import("../adapters/instagram_post.js");
      postInstagram(readJSON(path.join(dir,"instagram.json")), { safe: SAFE_MODE });
    } else { console.log("[-] Instagram disabled or missing draft."); }

    if (ENABLE.linkedin && fs.existsSync(path.join(dir,"linkedin.json"))){
      const { postLinkedIn } = await import("../adapters/linkedin_post.js");
      postLinkedIn(readJSON(path.join(dir,"linkedin.json")), { safe: SAFE_MODE });
    } else { console.log("[-] LinkedIn disabled or missing draft."); }

    if (ENABLE.youtube && fs.existsSync(path.join(dir,"youtube.json"))){
      const { postYouTube } = await import("../adapters/youtube_post.js");
      postYouTube(readJSON(path.join(dir,"youtube.json")), { safe: SAFE_MODE });
    } else { console.log("[-] YouTube disabled or missing draft."); }

    if (ENABLE.facebook && fs.existsSync(path.join(dir,"facebook.json"))){
      const { postFacebook } = await import("../adapters/facebook_post.js");
      postFacebook(readJSON(path.join(dir,"facebook.json")), { safe: SAFE_MODE });
    } else { console.log("[-] Facebook disabled or missing draft."); }
  }
}
main();
