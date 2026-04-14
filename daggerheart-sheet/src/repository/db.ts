export const DB_NAME = "daggerheart_sheet";
export const DB_VERSION = 1;

export const STORE_CHARACTERS = "characters";

export function openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(STORE_CHARACTERS)) {
                const store = db.createObjectStore(STORE_CHARACTERS, { keyPath: "id" });
                store.createIndex("byUpdatedAt", "updatedAt", { unique: false });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}
