export type SyncStatus = "pending" | "synced" | "failed";

export interface SyncRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: SyncStatus;
  lastSyncedAt?: string;
}

export interface UserProfile extends SyncRecord {
  userId: string;
  name: string;
  age: number;
  gender: string;
  location?: string;
  medicalHistory: string[];
  medications: string[];
  dietaryRestrictions: string[];
  activityBaseline?: string;
}

export interface ConsentRecord extends SyncRecord {
  userId: string;
  policyVersion: string;
  acceptedAt: string;
}

export interface SymptomMetric extends SyncRecord {
  userId: string;
  date: string;
  cramps: number;
  mood: number;
  energy: number;
  pain: number;
  sleepQuality: number;
}

export interface SymptomEntry extends SyncRecord {
  userId: string;
  date: string;
  tags: string[];
  notes?: string;
  photoPath?: string;
}

export interface AlertRecord extends SyncRecord {
  userId: string;
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  actionRequired: string;
}

export interface InsightRecord extends SyncRecord {
  userId: string;
  date: string;
  content: string;
  category: string;
}

export interface SubscriptionPlan extends SyncRecord {
  userId: string;
  planId: string;
  frequency: string;
  preferences: string[];
  status: "active" | "paused" | "canceled";
}

export interface HealthLogEntry extends SyncRecord {
  userId: string;
  type: "medication" | "lab" | "appointment" | "journal" | "exercise" | "sleep" | "food";
  date: string;
  details: string;
}

export interface NotificationRecord extends SyncRecord {
  userId: string;
  title: string;
  body: string;
  scheduledFor: string;
  deliveredAt?: string;
}

export interface SettingsRecord extends SyncRecord {
  userId: string;
  theme: "light" | "dark";
  language: string;
  units: string;
  accessibility: string[];
  biometricLockEnabled: boolean;
}
