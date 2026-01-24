import { AppCacheDatabase } from "../cache/cacheDatabase";
import { HealthLogEntry } from "../models";
import { createId, nowIso } from "../utils";

export const logHealthEntry = (
  db: AppCacheDatabase,
  input: Omit<HealthLogEntry, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): HealthLogEntry => {
  const entry: HealthLogEntry = {
    ...input,
    id: createId("healthlog"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("healthLogs", entry);
};
