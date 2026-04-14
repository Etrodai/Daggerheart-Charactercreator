import type { UUID } from "../utils/UUID";

/**
 * Leichtgewichtige Referenz auf eine Fähigkeit,
 * wie sie auf dem Charakter gespeichert wird.
 *
 * Im Gegensatz zum vollständigen `Skill` (Domain-Katalog)
 * enthält SkillRef nur die Daten, die pro Charakter variieren.
 */
export interface SkillRef {
  id: UUID;
  name: string;
  note: string;
}
