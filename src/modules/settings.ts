import { AppCacheDatabase } from "../cache/cacheDatabase";
import { SettingsRecord } from "../models";
import { createId, nowIso } from "../utils";

export const saveSettings = (
  db: AppCacheDatabase,
  input: Omit<SettingsRecord, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): SettingsRecord => {
  const settings: SettingsRecord = {
    ...input,
    id: createId("settings"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("settings", settings);
};
