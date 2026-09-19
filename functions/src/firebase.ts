import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

if (getApps().length === 0) {
  initializeApp();
}

export const db = getFirestore();
export const auth = getAuth();
export const bucket = getStorage().bucket();
export { FieldValue, Timestamp };

export const collections = {
  leads: db.collection('leads'),
  orders: db.collection('orders'),
  downloads: db.collection('downloadTokens'),
  webhookEvents: db.collection('webhookEvents'),
  rateLimits: db.collection('rateLimits'),
  mail: db.collection('mail'),
};
