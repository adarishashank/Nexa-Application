import { AppCacheDatabase } from "../cache/cacheDatabase";
import { ConsentRecord, UserProfile } from "../models";
import { createId, nowIso } from "../utils";

export const createProfile = (
  db: AppCacheDatabase,
  input: Omit<UserProfile, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): UserProfile => {
  const profile: UserProfile = {
    ...input,
    id: createId("profile"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("profiles", profile);
};

export const recordConsent = (
  db: AppCacheDatabase,
  input: Omit<ConsentRecord, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): ConsentRecord => {
  const consent: ConsentRecord = {
    ...input,
    id: createId("consent"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("consents", consent);
};
