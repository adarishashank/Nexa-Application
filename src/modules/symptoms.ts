import { AppCacheDatabase } from "../cache/cacheDatabase";
import { SymptomEntry, SymptomMetric } from "../models";
import { createId, nowIso } from "../utils";

export const logSymptomMetrics = (
  db: AppCacheDatabase,
  input: Omit<SymptomMetric, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): SymptomMetric => {
  const metric: SymptomMetric = {
    ...input,
    id: createId("metric"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("symptomMetrics", metric);
};

export const logSymptomEntry = (
  db: AppCacheDatabase,
  input: Omit<SymptomEntry, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): SymptomEntry => {
  const entry: SymptomEntry = {
    ...input,
    id: createId("entry"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("symptomEntries", entry);
};
