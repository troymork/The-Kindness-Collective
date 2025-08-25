import { SAFE_MODE, mustGet } from "../config";

export async function postViaSchedulerWebhook(payload: any, platform: string, episode: string){
  const url = process.env.SCHEDULER_WEBHOOK_URL; // optional env
  if (!url) {
    console.log("[SchedulerWebhook] No SCHEDULER_WEBHOOK_URL set. Logging payload only.");
    console.log(JSON.stringify({ platform, episode, payload, SAFE_MODE }, null, 2));
    return;
  }
  // In SAFE_MODE we just print the curl you'd run.
  const curl = [
    "curl -X POST",
    "-H 'Content-Type: application/json'",
    `--data '${JSON.stringify({ platform, episode, payload })}'`,
    `'${url}'`
  ].join(" ");
  if (SAFE_MODE) {
    console.log("[SchedulerWebhook SAFE] Would run:\n", curl);
    return;
  }
  const fetch = (await import("node-fetch")).default as any;
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform, episode, payload }) });
  console.log("[SchedulerWebhook] status:", res.status);
}
