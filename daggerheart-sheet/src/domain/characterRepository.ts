import type { Character, CharacterId } from "./types/Character";

export interface CharacterRepository {
  save(character: Character): Promise<void>;
  getById(id: CharacterId): Promise<Character | null>;
  list(): Promise<Character[]>;
  delete(id: CharacterId): Promise<void>;
}