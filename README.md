# Roma's assistant

Long-form GPT-style interface built with React + Vite, using a custom sunset-cyan visual theme.

## Features

- Long landing and product-style sections
- Official Google OAuth sign-in (Firebase Auth)
- Firestore-backed message persistence per signed-in user
- Local fallback mode when Firebase env is not configured
- Local chat simulation with assistant replies
- Distinct color identity (not default GPT styling)
- Responsive layout for desktop and mobile

## Safety note

This project does not request passwords and does not access external ChatGPT account data.

## Firebase Setup

1. Create a Firebase project.
2. Enable Authentication and turn on Google provider.
3. Create a Firestore database.
4. Copy `.env.example` to `.env`.
5. Fill all `VITE_FIREBASE_*` values from your Firebase web app config.
6. Start the app with `npm.cmd run dev`.

Without `.env` values, the app still runs in local demo mode.

## Firestore data model

- `users/{uid}/messages/{messageId}`
	- `role`: `user | assistant`
	- `text`: string
	- `createdAt`: server timestamp

## Security and launch docs

- Strict Firestore rules: `firestore.rules`
- Deploy checklist: `DEPLOY_CHECKLIST.md`
- Firebase config: `firebase.json`
- Firestore indexes config: `firestore.indexes.json`
- Firebase project alias template: `.firebaserc.example`

## Deploy flow

1. Install Firebase CLI globally (`npm.cmd install -g firebase-tools`) or use the built-in `npx` scripts.
2. Copy `.firebaserc.example` to `.firebaserc` and set your Firebase project ID.
3. Log in once:
	- `npm.cmd run firebase:login`
4. Deploy Firestore rules:
	- `npm.cmd run deploy:rules`
5. Deploy the full site (build + hosting + firestore config):
	- `npm.cmd run deploy`

If you only want hosting deploy:
- `npm.cmd run deploy:hosting`

## Firestore Rules Testing

Automated rules tests are included in `tests/firestore.rules.test.js`.

Prerequisite for emulator tests:
- Install JDK 21 or newer (Firebase Emulator requirement)

- Run with emulator (recommended):
	- `npm.cmd run test:rules`
- Run test file only (requires emulator running separately):
	- `npm.cmd run test:rules:local`

The suite checks:
- owner can create/read own message
- unauthenticated create is denied
- cross-user read is denied
- invalid role/text/extra fields are denied
- update and delete are denied

## Scripts

- `npm.cmd run dev` - start local development server
- `npm.cmd run build` - production build
- `npm.cmd run preview` - preview production build
- `npm.cmd run firebase:login` - authenticate Firebase CLI
- `npm.cmd run deploy:rules` - deploy Firestore rules only
- `npm.cmd run deploy:hosting` - build and deploy hosting only
- `npm.cmd run deploy` - build and deploy full Firebase targets
- `npm.cmd run test:rules` - run Firestore security tests via emulator
- `npm.cmd run test:rules:local` - run rule tests without starting emulator
