import type { Character, CharacterId } from "../domain/types/Character";
import type { CharacterRepository } from "../domain/characterRepository";

function clone<T>(value: T): T {
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

    this.store.set(updated.id, updated);
  }

  async getById(id: CharacterId): Promise<Character | null> {
    const found = this.store.get(id);
    return found ? clone(found) : null;
  }

  async list(): Promise<Character[]> {
    const all = Array.from(this.store.values()).map(clone);
    all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return all;
  }

  async delete(id: CharacterId): Promise<void> {
    this.store.delete(id);
  }
}
