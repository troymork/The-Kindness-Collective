# Notion Database Schema (v1)
## 1) Content Calendar
- Name (Title), Type (Select), Status (Select), Air Date (Date), Window (Select)
- Hosts (People), Guest (Relation → Guests), Platforms (Multi-select)
- Episode (Relation → Episodes), SPARK Quest (Relation → Quests)
- Cut-list URL (URL), Consent Verified (Checkbox), Assets (Relation), Notes
## 2) Episodes
- Name, Air Date/Time, Run of Show, Hosts, Guest, Timestamps, Transcript URL, Insights, Consent Pack
## 3) Guests
- Name, Handle, Email/DM, Bio, Topics, Availability, Episodes, Consent Signed
## 4) Assets
- Name, Type, Storage URL, Episode, Platform, Publish Status
## 5) Insights
- Name, Episode, Summary, Quotes, Themes, Next Topics
## 6) Consents
- Name, Episode, Guest, Signed At, Storage URL
## 7) Quests (SPARK)
- Name, Purpose, Steps, Proof Type, Reward, Episode
## 8) Tasks
- Name, Type, Assignee, Due, Status, Linked Episode
