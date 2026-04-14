import type { UUID } from "../utils/UUID";

export type QuestStatus = "open" | "active" | "done" | "failed";

export interface Quest {
  id: UUID;
  title: string;
  status: QuestStatus;
  note: string;
}
