import { AppCacheDatabase } from "../cache/cacheDatabase";
import { AlertRecord } from "../models";
import { createId, nowIso } from "../utils";

export const createAlert = (
  db: AppCacheDatabase,
  input: Omit<AlertRecord, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): AlertRecord => {
  const alert: AlertRecord = {
    ...input,
    id: createId("alert"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("alerts", alert);
};
