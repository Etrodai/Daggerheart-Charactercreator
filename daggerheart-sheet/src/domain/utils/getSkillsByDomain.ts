import * as allSkills from "../skills";
import type { DomainName } from "../types/DomainName";
import type { Skill } from "../types/Skill";

const skillMap: Record<DomainName, Skill[]> = {
    Arcana:   allSkills.arcanaSkills,
    Blade:    allSkills.bladeSkills,
    Bone:     allSkills.boneSkills,
    Codex:    allSkills.codexSkills,
    Grace:    allSkills.graceSkills,
    Midnight: allSkills.midnightSkills,
    Sage:     allSkills.sageSkills,
    Splendor: allSkills.splendorSkills,
    Valor:    allSkills.valorSkills,
};

export function getSkillsByDomain(domain: DomainName): Skill[] {
    return skillMap[domain];
}
