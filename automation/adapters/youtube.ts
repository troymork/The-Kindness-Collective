import { PlatformDraft } from "../types";
export function shapeYouTube(d: PlatformDraft){ return { title:d.title, description:d.text, tags:d.tags }; }
