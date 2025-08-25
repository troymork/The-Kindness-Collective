import { mustGet } from "../config";
type Payload = { title?: string; description: string; tags?: string[] };
export async function postYouTube(payload: Payload, { safe=true }: {safe?:boolean}={}){
  // const apiKey = mustGet("YT_API_KEY");
  console.log("[YouTube] payload", JSON.stringify(payload, null, 2), "SAFE_MODE:", safe);
}
