export const SAFE_MODE = (process.env.SAFE_MODE ?? "true").toLowerCase() !== "false";

/** Feature flags — enable platforms one-by-one later */
export const ENABLE = {
  x:        (process.env.ENABLE_X        ?? "false").toLowerCase() === "true",
  linkedin: (process.env.ENABLE_LINKEDIN ?? "false").toLowerCase() === "true",
  instagram:(process.env.ENABLE_INSTAGRAM?? "false").toLowerCase() === "true",
  youtube:  (process.env.ENABLE_YOUTUBE  ?? "false").toLowerCase() === "true",
  facebook: (process.env.ENABLE_FACEBOOK ?? "false").toLowerCase() === "true",
};

/** Helpers for reading secrets when you wire real APIs */
export function mustGet(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required secret: ${name}`);
  return v;
}
