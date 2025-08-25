import { SAFE_MODE, mustGet } from "../config";

/**
 * These functions emit a cURL template (SAFE_MODE=true) so you can paste into a secure terminal
 * or your scheduler. When SAFE_MODE=false, they attempt a POST via node-fetch if tokens are present.
 * You must provide the correct IDs/tokens in repo secrets or local .env:
 * - IG_USER_ID, IG_ACCESS_TOKEN
 * - FB_PAGE_ID, FB_PAGE_TOKEN
 */
async function doPost(url: string, body: any){
  const fetch = (await import("node-fetch")).default as any;
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return { status: res.status, text: await res.text() };
}

export async function postInstagramMeta(params: { caption: string, media_url?: string }){
  const IG_USER_ID = process.env.IG_USER_ID;
  const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
  const endpoint = `https://graph.facebook.com/v20.0/${IG_USER_ID}/media`;

  const body = { caption: params.caption, access_token: IG_ACCESS_TOKEN, ...(params.media_url ? { image_url: params.media_url } : {}) };
  const curl = [
    "curl -X POST",
    "-H 'Content-Type: application/json'",
    `--data '${JSON.stringify(body)}'`,
    `'${endpoint}'`
  ].join(" ");

  if (SAFE_MODE || !IG_USER_ID || !IG_ACCESS_TOKEN){
    console.log("[Instagram Meta SAFE] Create media (step 1) — pasteable cURL:\n", curl);
    console.log("[Instagram Meta SAFE] Then publish with: curl -X POST 'https://graph.facebook.com/v20.0/${IG_USER_ID}/media_publish?creation_id=CREATION_ID&access_token=IG_ACCESS_TOKEN'");
    return;
  }
  const creation = await doPost(endpoint, body);
  console.log("[Instagram Meta] create media:", creation.status, creation.text);
  // NOTE: Real flow requires extracting creation_id then calling /media_publish; we stop here for safety.
}

export async function postFacebookMeta(params: { message: string }){
  const FB_PAGE_ID = process.env.FB_PAGE_ID;
  const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
  const endpoint = `https://graph.facebook.com/v20.0/${FB_PAGE_ID}/feed`;
  const body = { message: params.message, access_token: FB_PAGE_TOKEN };

  const curl = [
    "curl -X POST",
    "-H 'Content-Type: application/json'",
    `--data '${JSON.stringify(body)}'`,
    `'${endpoint}'`
  ].join(" ");

  if (SAFE_MODE || !FB_PAGE_ID || !FB_PAGE_TOKEN){
    console.log("[Facebook Meta SAFE] Post to page feed — pasteable cURL:\n", curl);
    return;
  }
  const res = await doPost(endpoint, body);
  console.log("[Facebook Meta] status:", res.status, res.text);
}
