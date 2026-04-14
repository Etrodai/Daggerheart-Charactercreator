export type AttributeKey =
  | "strength"
  | "agility"
  | "presence"
  | "knowledge"
  | "instinct"
  | "endurance";

export type Attributes = Record<AttributeKey, number>;
