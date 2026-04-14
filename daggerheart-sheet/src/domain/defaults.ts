import type { Character, CharacterId, ISODateTime } from "./types/Character";
import type { UUID } from "./utils/UUID";
import type { Attributes } from "./types/Attributes";

function nowIso(): ISODateTime {
  return new Date().toISOString();
}

// Simple UUID für V1 (später kannst du crypto.randomUUID nutzen)
function newId(): UUID {
  return crypto.randomUUID();
}

function defaultAttributes(): Attributes {
  return {
    strength: 0,
    agility: 0,
    presence: 0,
    knowledge: 0,
    instinct: 0,
    endurance: 0,
  };
}

export function createNewCharacter(): Character {
  const timestamp = nowIso();
  const id = newId() as CharacterId;

  return {
    schemaVersion: 1,
    id,
    createdAt: timestamp,
    updatedAt: timestamp,

    core: {
      name: "Neuer Charakter",
      className: "Warrior",
      subclassName: "Stalwart",
      ancestryName: "Giant",
      level: 1,
      community: "",
    },

    stats: {
      attributes: defaultAttributes(),
      hope: { current: 0, max: 0 },
      stress: { current: 0, max: 0 },
      armor: { currentUsed: 0, max: 0 },
      damageThreshold: { minorthreshold: 0, majorthreshold: 0 },
      hp: { current: 0, max: 0 },
      zustand: [],
    },

    skills: {
      experiences: [],
      passiveSkills: [],
      activeSkills: [],
      vault: [],
    },

    combat: {
      toHitBonus: 0,
      weaponProfiles: [],
    },

    inventory: {
      slotsTotal: 0,
      activeLimit: 0,
      items: [],
      vault: [],
    },

    notes: {
      freeText: "",
      relations: [],
    },

    questlog: {
      quests: [],
    },
  };
}
