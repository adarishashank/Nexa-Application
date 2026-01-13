import { AppCacheDatabase } from "../cache/cacheDatabase";
import { NotificationRecord } from "../models";
import { createId, nowIso } from "../utils";

export const scheduleNotification = (
  db: AppCacheDatabase,
  input: Omit<NotificationRecord, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): NotificationRecord => {
  const notification: NotificationRecord = {
    ...input,
    id: createId("notification"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("notifications", notification);
};
