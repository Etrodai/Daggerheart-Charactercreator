import type { InventoryItem } from './inventory/InventoryItem';
import type { DomainName } from "./DomainName";
import type { ClassName } from "./ClassName";


export interface Class {
  beschreibung: string;
  domains: DomainName[];
  hopeSkillName: string;
  hopeSkillBeschreibung: string;
  startEvasion: number;
  startHp: number;
  classItem: InventoryItem[];
}

export const classes: Record<ClassName, Class> = {
  Bard: {
    beschreibung:
      "Bards are the most charismatic people in all the realms. Members of this class are masters of captivation and specialize in a variety of performance types, including singing, playing musical instruments, weaving tales, or telling jokes. Whether performing for an audience or speaking to an individual, bards thrive in social situations. Members of this profession bond and train at schools or guilds, but a current of egotism runs through those of the bardic persuasion. While they may be the most likely class to bring people together, a bard of ill temper can just as easily tear a party apart.",
    domains: ["Codex", "Grace"],
    hopeSkillName: "Make a Scene",
    hopeSkillBeschreibung:
      "Spend 3 Hope to temporarily Distract a target within Close range, giving them a -2 penalty to their Difficulty.",
    startEvasion: 10,
    startHp: 5,
    classItem: [
      {
        id: "0",
        name: "A romance novel",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "A letter never opened",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  Druid: {
    beschreibung:
      "Becoming a druid is more than an occupation; it’s a calling for those who wish to learn from and protect the magic of the wilderness. While one might underestimate a gentle druid who practices the often-quiet work of cultivating flora, druids who channel the untamed forces of nature are terrifying to behold. Druids cultivate their abilities in small groups, often connected by a specific ethos or locale, but some choose to work alone. Through years of study and dedication, druids can learn to transform into beasts and shape nature itself.",
    domains: ["Arcana", "Sage"],
    hopeSkillName: "Evolution",
    hopeSkillBeschreibung:
      "Spend 3 Hope to transform into a Beastform without marking a Stress. When you do, choose one trait to raise by +1 until you drop out of that Beastform.",
    startEvasion: 10,
    startHp: 6,
    classItem: [
      {
        id: "0",
        name: "A small bag of rocks and bones",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "A strange pendant found in the dirt",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  Guardian: {
    beschreibung:
      "The title of guardian represents an array of martial professions, speaking more to their moral compass and unshakeable fortitude than the means by which they fight. While many guardians join groups of militants for either a country or cause, they’re more likely to follow those few they truly care for, majority be damned. Guardians are known for fighting with remarkable ferocity even against overwhelming odds, defending their cohort above all else. Woe betide those who harm the ally of a guardian, as the guardian will answer this injury in kind.",
    domains: ["Blade", "Valor"],
    hopeSkillName: "Frontline Tank",
    hopeSkillBeschreibung: "Spend 3 Hope to clear 2 Armor Slots.",
    startEvasion: 9,
    startHp: 7,
    classItem: [
      {
        id: "0",
        name: "Totem from your mentor",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "Secret key",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  Ranger: {
    beschreibung:
      "Rangers are highly skilled hunters who, despite their martial abilities, rarely lend their skills to an army. Through mastery of the body and a deep understanding of the wilderness, rangers become sly tacticians, pursuing their quarry with cunning and patience. Many rangers track and fight alongside an animal companion with whom they’ve forged a powerful spiritual bond. By honing their skills in the wild, rangers become expert trackers, as likely to ensnare their foes in a trap as they are to assail them head-on.",
    domains: ["Bone", "Sage"],
    hopeSkillName: "Hold Them Off",
    hopeSkillBeschreibung:
      "Spend 3 Hope when you succeed on an attack with a weapon to use that same roll against two additional adversaries within range of the attack.",
    startEvasion: 12,
    startHp: 6,
    classItem: [
      {
        id: "0",
        name: "A trophy from your first kill",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "A seemingly broken compass",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  Rogue: {
    beschreibung:
      "Rogues are scoundrels, often in both attitude and practice. Broadly known as liars and thieves, the best among this class move through the world anonymously. Utilizing their sharp wits and blades, rogues trick their foes through social manipulation as easily as breaking locks, climbing through windows, or dealing underhanded blows. These masters of magical craft manipulate shadow and movement, adding an array of useful and deadly tools to their repertoire. Rogues frequently establish guilds to meet future accomplices, hire out jobs, and hone secret skills, proving that there’s honor among thieves for those who know where to look.",
    domains: ["Grace", "Midnight"],
    hopeSkillName: "Rogue’s Dodge",
    hopeSkillBeschreibung:
      "Spend 3 Hope to gain a +2 bonus to your Evasion until the next time an attack succeeds against you. Otherwise, this bonus lasts until your next rest.",
    startEvasion: 12,
    startHp: 6,
    classItem: [
      {
        id: "0",
        name: "Set of forgery tools",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "Grappling hook",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  Seraph: {
    beschreibung:
      "Seraphs are divine fighters and healers imbued with sacred purpose. A wide array of deities exist within the realms, and thus numerous kinds of seraphs are appointed by these gods. Their ethos traditionally aligns with the domain or goals of their god, such as defending the weak, exacting vengeance, protecting a land or artifact, or upholding a particular faith. Some seraphs ally themselves with an army or locale, much to the satisfaction of their rulers, but other crusaders fight in opposition to the follies of the Mortal Realm. It is better to be a seraph’s ally than their enemy, as they are terrifying foes to those who defy their purpose.",
    domains: ["Splendor", "Valor"],
    hopeSkillName: "Life Support",
    hopeSkillBeschreibung:
      "Spend 3 Hope to clear a Hit Point on an ally within Close range.",
    startEvasion: 9,
    startHp: 7,
    classItem: [
      {
        id: "0",
        name: "Bundle of offerings",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "Sigil of your god",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  Sorcerer: {
    beschreibung:
      "Not all innate magic users choose to hone their craft, but those who do can become powerful sorcerers. The gifts of these wielders are passed down through families, even if the family is unaware of or reluctant to practice them. A sorcerer’s abilities can range from the elemental to the illusionary and beyond, and many practitioners band together into collectives based on their talents. The act of becoming a formidable sorcerer is not the practice of acquiring power, but learning to cultivate and control the power one already possesses. The magic of a misguided or undisciplined sorcerer is a dangerous force indeed.",
    domains: ["Arcana", "Midnight"],
    hopeSkillName: "Volatile Magic",
    hopeSkillBeschreibung:
      "Spend 3 Hope to reroll any number of your damage dice on an attack that deals magic damage.",
    startEvasion: 10,
    startHp: 6,
    classItem: [
      {
        id: "0",
        name: "Whispering orb",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "Family heirloom",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  Warrior: {
    beschreibung:
      "Becoming a warrior requires years, often a lifetime, of training and dedication to the mastery of weapons and violence. While many who seek to fight hone only their strength, warriors understand the importance of an agile body and mind, making them some of the most sought-after fighters across the realms. Frequently, warriors find employment within an army, a band of mercenaries, or even a royal guard, but their potential is wasted in any position where they cannot continue to improve and expand their skills. Warriors are known to have a favored weapon; to come between them and their blade would be a grievous mistake.",
    domains: ["Blade", "Bone"],
    hopeSkillName: "No Mercy",
    hopeSkillBeschreibung:
      "Spend 3 Hope to gain a +1 bonus to your attack rolls until your next rest.",
    startEvasion: 11,
    startHp: 6,
    classItem: [
      {
        id: "0",
        name: "The drawing of a lover",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "Sharpening stone",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  Wizard: {
    beschreibung:
      "Whether through an institution or individual study, those known as wizards acquire and hone immense magical power over years of learning using a variety of tools, including books, stones, potions, and herbs. Some wizards dedicate their lives to mastering a particular school of magic, while others learn from a wide variety of disciplines. Many wizards become wise and powerful figures in their communities, advising rulers, providing medicines and healing, and even leading war councils. While these mages all work toward the common goal of collecting magical knowledge, wizards often have the most conflict within their own ranks, as the acquisition, keeping, and sharing of powerful secrets is a topic of intense debate that has resulted in innumerable deaths.",
    domains: ["Codex", "Splendor"],
    hopeSkillName: "Not This Time",
    hopeSkillBeschreibung:
      "Spend 3 Hope to force an adversary within Far range to reroll an attack or damage roll.",
    startEvasion: 11,
    startHp: 5,
    classItem: [
      {
        id: "0",
        name: "A book you’re trying to translate",
        note: "",
        slotSize: 0,
        active: false,
      },
      {
        id: "0",
        name: "Tiny, harmless elemental pet",
        note: "",
        slotSize: 0,
        active: false,
      },
    ],
  },
  "": {
    beschreibung: "",
    domains: [],
    hopeSkillName: "",
    hopeSkillBeschreibung: "",
    startEvasion: 0,
    startHp: 0,
    classItem: [],
  },
};
