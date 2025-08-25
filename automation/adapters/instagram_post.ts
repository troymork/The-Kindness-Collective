import { mustGet } from "../config";
type Payload = { caption: string };
export async function postInstagram(payload: Payload, { safe=true }: {safe?:boolean}={}){
  // const token = mustGet("IG_ACCESS_TOKEN");
  console.log("[Instagram] payload", JSON.stringify(payload, null, 2), "SAFE_MODE:", safe);
}
