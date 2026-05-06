import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { afterAll, afterEach, beforeAll, describe, it } from 'vitest';

const projectId = 'demo-roma-assistant';
const rules = readFileSync(resolve(process.cwd(), 'firestore.rules'), 'utf8');

let testEnv;

function getMessageRef(context, userId = 'alice', messageId = 'm1') {
  return doc(context.firestore(), 'users', userId, 'messages', messageId);
}

function buildValidMessage(overrides = {}) {
  return {
    role: 'user',
    text: 'hello world',
    createdAt: new Date(),
    ...overrides,
  };
}

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId,
    firestore: {
      rules,
    },
  });
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('firestore.rules', () => {
  it('allows owner to create and read own message', async () => {
    const alice = testEnv.authenticatedContext('alice');
    const aliceMessage = getMessageRef(alice, 'alice', 'm1');

    await assertSucceeds(setDoc(aliceMessage, buildValidMessage()));
    await assertSucceeds(getDoc(aliceMessage));
  });

  it('denies unauthenticated users from creating messages', async () => {
    const guest = testEnv.unauthenticatedContext();
    const guestMessage = getMessageRef(guest, 'alice', 'm1');

    await assertFails(setDoc(guestMessage, buildValidMessage()));
  });

  it('denies non-owner from reading another user messages', async () => {
    const alice = testEnv.authenticatedContext('alice');
    const bob = testEnv.authenticatedContext('bob');
    const aliceMessage = getMessageRef(alice, 'alice', 'm1');

    await assertSucceeds(setDoc(aliceMessage, buildValidMessage()));

    const bobTryingToRead = getMessageRef(bob, 'alice', 'm1');
    await assertFails(getDoc(bobTryingToRead));
  });

  it('denies invalid role values', async () => {
    const alice = testEnv.authenticatedContext('alice');
    const aliceMessage = getMessageRef(alice, 'alice', 'm1');

    await assertFails(setDoc(aliceMessage, buildValidMessage({ role: 'system' })));
  });

  it('denies empty text or oversized text', async () => {
    const alice = testEnv.authenticatedContext('alice');

    await assertFails(setDoc(getMessageRef(alice, 'alice', 'm1'), buildValidMessage({ text: '' })));
    await assertFails(
      setDoc(
        getMessageRef(alice, 'alice', 'm2'),
        buildValidMessage({ text: 'x'.repeat(4001) }),
      ),
    );
  });

  it('denies extra fields not in allowed schema', async () => {
    const alice = testEnv.authenticatedContext('alice');
    const aliceMessage = getMessageRef(alice, 'alice', 'm1');

    await assertFails(setDoc(aliceMessage, buildValidMessage({ debug: true })));
  });

  it('denies update and delete operations', async () => {
    const alice = testEnv.authenticatedContext('alice');
    const aliceMessage = getMessageRef(alice, 'alice', 'm1');

    await assertSucceeds(setDoc(aliceMessage, buildValidMessage()));
    await assertFails(updateDoc(aliceMessage, { text: 'edited' }));
    await assertFails(deleteDoc(aliceMessage));
  });
});
