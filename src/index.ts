import { AppCacheDatabase } from "./cache/cacheDatabase";
import { SyncQueue } from "./cache/syncQueue";

export const createAppCache = (): AppCacheDatabase =>
  new AppCacheDatabase([
    "profiles",
    "consents",
    "symptomMetrics",
    "symptomEntries",
    "alerts",
    "insights",
    "subscriptions",
    "healthLogs",
    "notifications",
    "settings",
  ]);

export const createSyncQueue = (): SyncQueue => new SyncQueue();

export * from "./models";
export * from "./modules/alerts";
export * from "./modules/auth";
export * from "./modules/healthLog";
export * from "./modules/insights";
export * from "./modules/notifications";
export * from "./modules/settings";
export * from "./modules/subscriptions";
export * from "./modules/symptoms";
