import type { Character, CharacterId } from "../domain/types/Character";
import type { CharacterRepository } from "../domain/characterRepository";
import { openDb, STORE_CHARACTERS } from "./db";

function clone<T>(value: T): T {
  return structuredClone(value);
}

function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function waitTransaction(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error ?? new Error("Transaction aborted"));
    tx.onerror = () => reject(tx.error ?? new Error("Transaction error"));
  });
}

export class IndexedDbCharacterRepository implements CharacterRepository {
  private dbPromise = openDb();

  async save(character: Character): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_CHARACTERS, "readwrite");
    const store = tx.objectStore(STORE_CHARACTERS);

    const now = new Date().toISOString();
    const updated: Character = {
      ...clone(character),
      updatedAt: now,
    };

    store.put(updated);
    await waitTransaction(tx);
  }

  async getById(id: CharacterId): Promise<Character | null> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_CHARACTERS, "readonly");
    const store = tx.objectStore(STORE_CHARACTERS);

    const result = await promisifyRequest<Character | undefined>(store.get(id));
    await waitTransaction(tx);

    return result ? clone(result) : null;
  }

  async list(): Promise<Character[]> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_CHARACTERS, "readonly");
    const store = tx.objectStore(STORE_CHARACTERS);

    const results = await promisifyRequest<Character[]>(store.getAll());
    await waitTransaction(tx);

    results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return results.map(clone);
  }

  async delete(id: CharacterId): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE_CHARACTERS, "readwrite");
    const store = tx.objectStore(STORE_CHARACTERS);

    store.delete(id);
    await waitTransaction(tx);
  }
}
