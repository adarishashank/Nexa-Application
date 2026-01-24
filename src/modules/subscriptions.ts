import { AppCacheDatabase } from "../cache/cacheDatabase";
import { SubscriptionPlan } from "../models";
import { createId, nowIso } from "../utils";

export const saveSubscription = (
  db: AppCacheDatabase,
  input: Omit<SubscriptionPlan, "id" | "createdAt" | "updatedAt" | "syncStatus">,
): SubscriptionPlan => {
  const subscription: SubscriptionPlan = {
    ...input,
    id: createId("subscription"),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    syncStatus: "pending",
  };

  return db.upsert("subscriptions", subscription);
};
