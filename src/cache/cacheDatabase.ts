import { SyncRecord, SyncStatus } from "../models";

export type CollectionName =
  | "profiles"
  | "consents"
  | "symptomMetrics"
  | "symptomEntries"
  | "alerts"
  | "insights"
  | "subscriptions"
  | "healthLogs"
  | "notifications"
  | "settings";

export class AppCacheDatabase {
  private collections: Map<CollectionName, Map<string, SyncRecord>> = new Map();

  constructor(collections: CollectionName[]) {
    collections.forEach((name) => this.collections.set(name, new Map()));
  }

  upsert<T extends SyncRecord>(collection: CollectionName, record: T): T {
    const table = this.getTable(collection);
    const updatedRecord = {
      ...record,
      updatedAt: new Date().toISOString(),
      syncStatus: record.syncStatus ?? "pending",
    } as T;

    table.set(record.id, updatedRecord);
    return updatedRecord;
  }

  list<T extends SyncRecord>(collection: CollectionName): T[] {
    return Array.from(this.getTable(collection).values()) as T[];
  }

  get<T extends SyncRecord>(collection: CollectionName, id: string): T | undefined {
    return this.getTable(collection).get(id) as T | undefined;
  }

  markSynced(collection: CollectionName, id: string): void {
    const table = this.getTable(collection);
    const record = table.get(id);
    if (!record) {
      return;
    }
    table.set(id, {
      ...record,
      syncStatus: "synced",
      lastSyncedAt: new Date().toISOString(),
    });
  }

  markFailed(collection: CollectionName, id: string): void {
    const table = this.getTable(collection);
    const record = table.get(id);
    if (!record) {
      return;
    }
    table.set(id, {
      ...record,
      syncStatus: "failed",
    });
  }

  listBySyncStatus<T extends SyncRecord>(
    collection: CollectionName,
    status: SyncStatus,
  ): T[] {
    return this.list<T>(collection).filter((record) => record.syncStatus === status);
  }

  private getTable(collection: CollectionName): Map<string, SyncRecord> {
    const table = this.collections.get(collection);
    if (!table) {
      throw new Error(`Collection ${collection} not configured`);
    }
    return table;
  }
}
