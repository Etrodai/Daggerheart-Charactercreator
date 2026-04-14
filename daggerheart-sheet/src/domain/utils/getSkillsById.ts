import { allSkills } from "../skills";
import type { Skill } from "../types/Skill";

export function getSkillsById(ids: string[]): Skill[] {
  return ids
    .map((id) => allSkills.find((skill) => skill.skillId === id))
    .filter((skill): skill is Skill => skill !== undefined);
}
