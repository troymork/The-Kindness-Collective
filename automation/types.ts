export type BaseDraft = {
  id: string;
  title: string;
  hook: string;
  themes: string[];
  cta?: string;
  clips: Array<{ start: number; end: number; description?: string }>;
  quotes?: string[];
};
export type PlatformDraft = {
  platform: "x"|"linkedin"|"instagram"|"youtube"|"facebook";
  text: string;
  title?: string;
  tags?: string[];
  assets?: string[];
};
