import { AppCacheDatabase } from "../cache/cacheDatabase";
import { InsightRecord } from "../models";
import { createId, nowIso } from "../utils";

export const saveInsight = (
  db: AppCacheDatabase,
  input: Omit<InsightRecord, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): InsightRecord => {
  const insight: InsightRecord = {
    ...input,
    id: createId("insight"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("insights", insight);
};
