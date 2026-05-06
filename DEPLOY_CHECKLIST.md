# Roma's assistant deploy-ready checklist

This checklist is tailored for the current architecture:
- React + Vite frontend
- Firebase Auth (Google provider)
- Firestore path: users/{uid}/messages/{messageId}

## 1) Project and environment

- Firebase project is created for production
- Web app is registered in Firebase project settings
- All VITE_FIREBASE_* variables are set in production hosting
- Environment values are verified against Firebase console
- Allowed Auth domain list includes your production domain

Pass criteria:
- App starts in production without missing-env fallback warning

## 2) Authentication hardening

- Google sign-in is enabled in Firebase Authentication
- Unused auth providers are disabled
- Authorized domains are restricted to expected domains only
- Test sign-in and sign-out using a non-admin account

Pass criteria:
- User can sign in/out successfully, and unknown domains are blocked

## 3) Firestore security rules

- Local test environment has JDK 21+ for Firebase Emulator
- Deploy rules from firestore.rules
- Rules enforce owner-only access to users/{uid}/messages/*
- Rules allow only create/get/list for messages
- Rules deny update/delete for message documents
- Rules validate role, text length, and createdAt timestamp

Pass criteria:
- User A cannot read/write User B documents
- Invalid payloads are rejected by rules

## 4) Firestore indexes and quotas

- Confirm no composite index is required for current query shape
- Review Firestore read/write quota expectations
- Enable billing alerts and budget caps

Pass criteria:
- No index runtime errors during chat read/sync

## 5) Build and performance

- Run npm.cmd run build successfully
- Run npm.cmd run preview smoke test
- Validate main flows on desktop and mobile
- Review JS bundle size and decide if code splitting is needed

Pass criteria:
- No blocking console errors and critical interactions remain responsive

## 6) Monitoring and error visibility

- Add frontend error tracking (optional but recommended)
- Ensure production logs can be inspected quickly
- Confirm auth and Firestore failures surface user-safe messages

Pass criteria:
- Failures are observable without exposing sensitive details

## 7) Backup and recovery

- Define data retention policy for chat messages
- Plan Firestore export cadence if needed
- Document rollback path for frontend deployment

Pass criteria:
- Team can recover from bad release or accidental data loss event

## 8) Final smoke test before release

- Open app on production URL
- Sign in with Google
- Send 2-3 prompts
- Refresh page and confirm messages rehydrate from Firestore
- Sign out and confirm session behavior is correct

Pass criteria:
- End-to-end user flow succeeds without manual intervention

## Optional Firebase CLI commands

- firebase login
- firebase init firestore
- firebase deploy --only firestore:rules
- firebase deploy
