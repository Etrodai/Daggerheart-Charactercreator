import type { ClassName } from "./ClassName";
import type { Attributes } from "./Attributes";
import type { Experience } from "./Experience";
import type { InventoryItem } from "./inventory/InventoryItem";
import type { Quest } from "./Quest";
import type { Zustand } from "./Zustand";
import type { SubclassName as Subclass } from "./SubclassName";
import type { Ancestry } from "./Ancestry";
import type { Community } from "./Community";
import type { Weapon } from "./inventory/Weapon";
import type { UUID } from "../utils/UUID";
export type ISODateTime = string;
export type CharacterId = string;

export interface Character {
  schemaVersion: 1;
  id: CharacterId;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;

  core: CharacterCore;
  stats: CharacterStats;
  skills: CharacterSkills;
  combat: CharacterCombat;
  inventory: CharacterInventory;

  notes: CharacterNotes;
  questlog: CharacterQuestlog;
}

export interface CharacterCore {
  name: string;
  className: ClassName; // Class
  subclassName: Subclass; // SubClass
  ancestryName: Ancestry; // Ancestry
  level: number;
  community: Community;
}

export interface CharacterStats {
  attributes: Attributes;
  hope: {
    current: number;
    max: number;
  };
  stress: {
    current: number;
    max: number;
  };
  armor: {
    currentUsed: number;
    max: number;
  };
  damageThreshold: {
    minorthreshold: number;
    majorthreshold: number;
  };
  hp: {
    current: number;
    max: number;
  };
  zustand: Zustand[];
}

export interface CharacterSkills {
  experiences: Experience[];
  passiveSkills: string[];
  activeSkills: string[];
  vault: string[];
}

export interface CharacterInventory {
  slotsTotal: number;
  activeLimit: number;

  items: InventoryItem[];
  vault: InventoryItem[]; // getrennte Aufbewahrung, optional
}

export interface CharacterQuestlog {
  quests: Quest[];
}

export interface CharacterNotes {
  freeText: string;
  relations: Relation[];
}

export interface CharacterCombat {
  toHitBonus: number; // später evtl. berechnet
  weaponProfiles: Weapon[];
}

export interface Relation {
  id: UUID;
  name: string;
  type: string; // z.B. "Ally", "Rival", "Mentor" etc.
  note: string;
}