import type { AttributeKey } from "../Attributes";
import type { InventoryItem } from "./InventoryItem";

export interface Weapon extends InventoryItem {
  damage: string;
  range: string;
  twohanded: boolean;
  attribute: AttributeKey;
}
