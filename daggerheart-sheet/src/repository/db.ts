export const DB_NAME = "daggerheart_sheet";
export const DB_VERSION = 1;

export const STORE_CHARACTERS = "characters";

/**
 * Öffnet die IndexedDB und legt beim ersten Start (oder bei Versionswechsel)
 * die benötigten ObjectStores an.
 */
export function openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;

            // Wird nur ausgeführt, wenn:
            // - DB neu ist, oder
            // - DB_VERSION erhöht wurde
            if (!db.objectStoreNames.contains(STORE_CHARACTERS)) {
                // keyPath: "id" -> jedes gespeicherte Objekt muss ein Feld `id` besitzen
                const store = db.createObjectStore(STORE_CHARACTERS, { keyPath: "id" });

                // Optional: Index für Sortierung/Abfragen
                // updatedAt ist ein ISO-String, lässt sich lexikografisch sortieren
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