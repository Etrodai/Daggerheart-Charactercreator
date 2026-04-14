import type { AttributeKey } from "../Attributes";
import type { InventoryItem } from "./InventoryItem";

export interface Weapon extends InventoryItem {
  damage: string; // z.B. "1d8+2" oder ein strukturiertes Modell; V1: string
  range: string;
  twohanded: boolean;
  attribute: AttributeKey
}
