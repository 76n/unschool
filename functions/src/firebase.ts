import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';

if (getApps().length === 0) {
  initializeApp();
}

export const db = getFirestore();
export const auth = getAuth();
export { FieldValue, Timestamp };

export const collections = {
  leads: db.collection('leads'),
  rateLimits: db.collection('rateLimits'),
  mail: db.collection('mail'),
};
