/**
 * Keeps processed document files in this browser (IndexedDB) so they survive a reload.
 * Falls back to memory when IndexedDB is unavailable, for example in some private windows.
 */
const DB_NAME = 'nwse-demo-documents';
const STORE = 'pages';

let dbPromise: Promise<IDBDatabase | null> | null = null;
const memory = new Map<string, Blob>();

function openDb(): Promise<IDBDatabase | null> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      try {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
        request.onblocked = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }
  return dbPromise;
}

function run<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T | undefined> {
  return openDb().then(
    (db) =>
      new Promise((resolve) => {
        if (!db) return resolve(undefined);
        try {
          const request = action(db.transaction(STORE, mode).objectStore(STORE));
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => resolve(undefined);
        } catch {
          resolve(undefined);
        }
      }),
  );
}

export const blobStore = {
  async put(id: string, blob: Blob): Promise<void> {
    memory.set(id, blob);
    await run('readwrite', (s) => s.put(blob, id));
  },

  async get(id: string): Promise<Blob | null> {
    const cached = memory.get(id);
    if (cached) return cached;
    const stored = await run<Blob>('readonly', (s) => s.get(id) as IDBRequest<Blob>);
    if (stored) memory.set(id, stored);
    return stored ?? null;
  },

  async delete(id: string): Promise<void> {
    memory.delete(id);
    await run('readwrite', (s) => s.delete(id));
  },

  async clear(): Promise<void> {
    memory.clear();
    await run('readwrite', (s) => s.clear());
  },
};
