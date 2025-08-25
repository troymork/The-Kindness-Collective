import { mustGet } from "../config";
type Payload = { text: string; title?: string; tags?: string[] };
export async function postLinkedIn(payload: Payload, { safe=true }: {safe?:boolean}={}){
  // const token = mustGet("LINKEDIN_TOKEN");
  console.log("[LinkedIn] payload", JSON.stringify(payload, null, 2), "SAFE_MODE:", safe);
}
