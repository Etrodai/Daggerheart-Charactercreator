import type { UUID } from "../../utils/UUID";

export interface InventoryItem {
  id: UUID;
  name: string;
  slotSize: number;
  active: boolean; // "ausgewählt/aktiv"
  note: string;
}
