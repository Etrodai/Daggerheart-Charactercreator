import type { DomainName } from "./DomainName";

export interface Skill {
  skillId: string;
  skillName: string;
  skillBeschreibung: string;
  skillLevel: 1 | 2 | 3 | 4 | 5;
  skillStresskosten: number;
  domain: DomainName;
}
