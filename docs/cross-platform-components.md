# Nexa+ Cross-Platform Component Blueprint (Offline-First)

## Cross-Platform Stack Assumptions
- **Target clients:** iOS, Android, and Web from a single shared codebase.
- **Local-first architecture:** all user-facing features read/write from an **app cache database** (encrypted local storage) with background sync to cloud services when available.
- **Offline behavior:** every component must be functional without network access for core flows (capture, review, and display historical data).

## Offline-First Data Model (App Cache Database)
Each component below writes to and reads from the local cache database first, then syncs to the cloud API with conflict resolution and audit tracking.

Core local collections/tables (examples):
- `users`, `profiles`, `consents`, `auth_sessions`
- `symptom_entries`, `symptom_metrics`, `symptom_notes`, `symptom_photos`
- `alerts`, `risk_assessments`, `ai_recommendations`
- `insights`, `goals`, `badges`, `progress_scores`
- `subscriptions`, `kits`, `kit_items`, `deliveries`, `payments`, `invoices`
- `health_logs`, `medications`, `lab_results`, `appointments`, `journals`
- `messages`, `notifications`, `reminders`
- `wearables`, `device_syncs`, `partner_integrations`
- `settings`, `preferences`, `privacy_controls`, `security_events`

## Component-Level Cross-Platform Build Plan

### 1) Authentication & User Management Module
#### 1.1 Registration & Onboarding
**Cross-platform components to build**
- **Multi-step onboarding flow** with state persisted in cache (`onboarding_state`), allowing users to resume without data loss.
- **Health survey UI** (medical history, medications, dietary restrictions, activity baseline) stored locally under `profiles` and `medical_histories`.
- **Consent & privacy capture** stored in `consents` with timestamp and version.
- **Credential + OAuth UI** (email/SMS verification, social login options) backed by local session state in `auth_sessions`.
- **Biometric/PIN enablement** with local secure enclave binding and a `security_events` audit trail.

**Offline-first behavior**
- Allow onboarding data entry without connectivity; enqueue verification for when online.
- Persist draft state and any unsubmitted data in cache with versioned entries.

#### 1.2 User Profile Management
**Cross-platform components to build**
- **Profile editor** for demographics, medical history, medications, and preferences.
- **Notification preferences** manager (push + in-app toggles).
- **Privacy settings** and **data export/delete** request flow.

**Offline-first behavior**
- Local edits apply immediately and show “sync pending” status until server confirmation.

---

### 2) Daily Symptom Check-In Module
#### 2.1 Symptom Logging
**Cross-platform components to build**
- **Daily check-in home card** with personalized greeting (cached from last user record).
- **Slider controls** for cramps/mood/energy/pain/sleep stored in `symptom_metrics`.
- **Quick-select symptom chips** stored as `symptom_entries` with tags.
- **Free-text notes** and **photo capture** stored in `symptom_notes` and `symptom_photos` (encrypted file store + metadata).
- **Submit + skip actions** with local timestamps.

**Offline-first behavior**
- Submit writes to cache instantly; background sync includes photo uploads when online.

#### 2.2 Symptom History & Trends
**Cross-platform components to build**
- **History timeline** (daily/weekly/monthly) from local queries.
- **Charts** for trends and correlations (derived data cached as `symptom_trends`).
- **Export feature** generating PDF/CSV from cached data.

---

### 3) AI Analysis & Intelligence Module
#### 3.1 AI Processing Engine (Client-side & Cloud)
**Cross-platform components to build**
- **Local inference wrapper** for lightweight heuristics (ex: sudden pain spike). Results stored in `risk_assessments`.
- **Cloud AI request queue** that submits data when online and caches responses in `ai_recommendations`.

#### 3.2 Medical Alert System
**Cross-platform components to build**
- **Alert detail screens** with severity bands (low/medium/high/critical) stored in `alerts`.
- **Emergency flow**: immediate call/contacts + “confirm stability” gate stored in `security_events`.

#### 3.3 Data Security & HIPAA Compliance Layer
**Cross-platform components to build**
- **Encrypted cache database** with key management bound to device secure storage.
- **Audit logging** for any sensitive read/write in `security_events`.
- **TLS-only sync** module with token rotation and offline-safe session caching.

---

### 4) Insights & Guidance Module
#### 4.1 Personalized Insights Dashboard
**Cross-platform components to build**
- **“Today’s Guidance” card** cached in `insights` with local rules fallback.
- **Content carousel** for wellness tips, mindfulness prompts, and encouragement stored locally.

#### 4.2 Progress Tracking
**Cross-platform components to build**
- **Health score visualization** derived from cached metrics.
- **Goal tracking + achievements** stored in `goals` and `badges` with offline updates.
- **Timeline view** of recovery progress using cached events.

---

### 5) Wellness Kit Subscription Module
#### 5.1 Kit Configuration
**Cross-platform components to build**
- **Plan selector** and **frequency controls** stored in `subscriptions`.
- **Personalization form** for dietary, cultural, activity preferences stored in `kit_preferences`.

#### 5.2 Kit Contents Display
**Cross-platform components to build**
- **Kit preview UI** pulling cached `kit_items`.
- **Checklist + delivery tracking** stored in `deliveries`.
- **Ratings and feedback** stored locally and synced later.

#### 5.3 Subscription Management
**Cross-platform components to build**
- **Pause/resume flows** with local state updates and sync queue.
- **Address and payment method views** backed by cached profiles and tokens.

#### 5.4 Payment Integration
**Cross-platform components to build**
- **PCI-safe payment UI** (tokenization only) with cached invoice history in `payments`/`invoices`.
- **Promo/discount component** with local validation and sync.

---

### 6) Health Log & Journal Module
#### 6.1 Comprehensive Health Log
**Cross-platform components to build**
- **Medication tracker + reminders** stored in `medications` and `reminders`.
- **Lab results upload** stored in `lab_results` with secure attachment handling.
- **Appointments + calendar** stored in `appointments`.
- **Journals** (symptom, mood, food, exercise, sleep) stored in `journals`.

#### 6.2 Data Visualization
**Cross-platform components to build**
- **Charts + filters** with data sourced from local cache tables.
- **Calendar view** for quick scanning.
- **Export engine** for PDF/CSV generation offline.

---

### 7) Community & Support Module (Future Feature)
#### 7.1 Community Forum
**Cross-platform components to build**
- **Thread list + topic channels** cached in `community_threads`.
- **Anonymous posting toggle** stored in `privacy_controls`.

#### 7.2 Professional Connection
**Cross-platform components to build**
- **Provider directory** with cached profiles and specialty filters.
- **Telemedicine links** stored in `provider_integrations`.
- **HIPAA-compliant messaging** stored in `messages` with encrypted payloads.

---

### 8) Integration & Partnerships Module
#### 8.1 Wearable Device Integration
**Cross-platform components to build**
- **Device linking UI** stored in `wearables`.
- **Sync jobs** for heart rate, sleep, steps stored in `device_syncs`.

#### 8.2 Partner Integration
**Cross-platform components to build**
- **Meal prep/physical therapist connectors** with cached partner data.
- **Pharmacy integration** with medication fill status cached in `partner_integrations`.

---

### 9) Notification & Communication Module
#### 9.1 Push Notifications
**Cross-platform components to build**
- **Notification scheduler** with cached `reminders` and local triggers.
- **Delivery tracking** for alerts and subscription updates stored in `notifications`.

#### 9.2 In-App Messaging
**Cross-platform components to build**
- **System message inbox** stored in `messages`.
- **Personalized guidance threads** cached for offline reading.

---

### 10) Analytics & Admin Dashboard Module (Admin-facing)
#### 10.1 User Analytics
**Cross-platform components to build**
- **Engagement dashboards** (admin app/web) with anonymized cached data.
- **Retention + churn views** with offline snapshots for review.

#### 10.2 Content Management
**Cross-platform components to build**
- **Content library editor** with cached draft state.
- **Partner management + support tickets** stored in `admin_tasks` and `support_tickets`.

---

### 11) Settings & Preferences Module
#### 11.1 App Settings
**Cross-platform components to build**
- **Theme/language/units/timezone** preferences stored in `settings`.
- **Accessibility controls** stored in `preferences`.

#### 11.2 Privacy & Security Settings
**Cross-platform components to build**
- **Biometric/PIN management** tied to secure storage.
- **Data sharing preferences** stored in `privacy_controls`.
- **Session timeout + device management** stored in `security_events`.

---

## Offline Sync & App Cache Database Requirements
- **Sync queue** with retry/backoff, conflict resolution, and partial failure handling.
- **Change tracking** with `updated_at`, `sync_status`, and `last_synced_at` for each record.
- **Encrypted attachments** for photos and documents with local indexing.
- **Audit log** for HIPAA and privacy reviews.

## Cross-Platform UX/Design Consistency Notes
- Use shared UI components (sliders, chips, charts, cards) to ensure a unified experience across iOS/Android/Web.
- Local caching ensures **instant load** and **consistent navigation**, even offline.
- All modules rely on the same local database schema to reduce duplication and simplify sync.
