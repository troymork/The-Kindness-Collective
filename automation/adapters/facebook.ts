import { PlatformDraft } from "../types";
export function shapeFacebook(d: PlatformDraft){ return { message: d.text }; }
