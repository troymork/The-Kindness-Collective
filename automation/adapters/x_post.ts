import { mustGet } from "../config";
type Payload = { text: string };
export async function postX(payload: Payload, { safe=true }: {safe?:boolean}={}){
  // Example for real posting (when you wire it):
  // const token = mustGet("X_BEARER_TOKEN");
  console.log("[X] payload", JSON.stringify(payload, null, 2), "SAFE_MODE:", safe);
}
