import { mustGet } from "../config";
type Payload = { message: string };
export async function postFacebook(payload: Payload, { safe=true }: {safe?:boolean}={}){
  // const token = mustGet("FB_PAGE_TOKEN");
  console.log("[Facebook] payload", JSON.stringify(payload, null, 2), "SAFE_MODE:", safe);
}
