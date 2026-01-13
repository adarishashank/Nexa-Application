# Nexa-Application

Nexa+ is a comprehensive women's health management platform designed to address misdiagnosis, delayed diagnosis, and daily health challenges faced by women, particularly those with autoimmune diseases. The application combines AI-driven symptom analysis, personalized health guidance, and subscription-based wellness kits to provide holistic care.

## Cross-Platform Offline-First Implementation

This repository now includes a lightweight cross-platform **app cache database** implementation with module helpers that persist and manage local data for key Nexa+ components (auth, symptoms, alerts, insights, subscriptions, health logs, notifications, and settings). The cache is designed to be used by a shared iOS/Android/Web codebase to ensure every flow works offline and syncs safely when online.

See `docs/cross-platform-components.md` for the component blueprint and `src/` for the implementation scaffolding.
