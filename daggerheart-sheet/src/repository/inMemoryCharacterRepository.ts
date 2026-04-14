import type { Character, CharacterId } from "../domain/SkillRef";
import type { CharacterRepository } from "../domain/characterRepository";

function clone<T>(value: T): T {
  // für V1 ok (dein Objekt ist JSON-kompatibel)
  //Wir klonen, damit im Speicher eine andere Version liegt als im UI dargestellt.
  // Ohne dies sind sofort alle Änderungen auch gespeichert und der Speichern Button ist sinnlos
  return structuredClone(value);
}

export class InMemoryCharacterRepository implements CharacterRepository {
  private store = new Map<CharacterId, Character>();

  async save(character: Character): Promise<void> {
    const now = new Date().toISOString();
    const updated: Character = {
      ...clone(character),
      updatedAt: now,
    };

    // Hinweis: createdAt bleibt wie es ist (kommt von der Factory)
    this.store.set(updated.id, updated);
  }

  async getById(id: CharacterId): Promise<Character | null> {
    const found = this.store.get(id);
    return found ? clone(found) : null;
  }

  async list(): Promise<Character[]> {
    // Optional: sortiert nach updatedAt (neueste zuerst)
    const all = Array.from(this.store.values()).map(clone);
    all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return all;
  }

  async delete(id: CharacterId): Promise<void> {
    this.store.delete(id);
  }
}