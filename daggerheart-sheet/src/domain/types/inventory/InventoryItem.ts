import type { UUID } from "../../utils/UUID";

export interface InventoryItem {
  id: UUID;
  name: string;
  slotSize: number;
  active: boolean;
  note: string;
}
