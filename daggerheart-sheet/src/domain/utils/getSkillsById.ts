import { allSkills } from "../skills"
import type { Skill } from "../types/Skill";


export function getSkillsById(ids: string[]): Skill[]
{
    const foundSkills: Skill[] = [];
    ids.forEach(id => {
        allSkills.filter(skill => skill.skillId == id)
        
    });
    
    //alle Skills in einer Liste
    //Wenn id ist passend mit id in der Liste --> Füge Item einem Array hinzu
    //Wiederhole das für alle Parameter ids
    //Am Ende, return Array mit Skills
    return foundSkills;
};