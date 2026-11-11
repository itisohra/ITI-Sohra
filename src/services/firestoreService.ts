import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Notice, GalleryItem } from '../data/itiData';

const CIRCULARS_COLLECTION = 'circulars';
const GALLERY_COLLECTION = 'gallery';

/**
 * Subscribes to real-time circulars from Firestore.
 */
export function subscribeToCirculars(
  onData: (circulars: Notice[]) => void,
  onError?: (err: unknown) => void
): () => void {
  try {
    const q = collection(db, CIRCULARS_COLLECTION);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: Notice[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as Notice);
        });
        // Sort newest first
        items.sort((a, b) => (b.id > a.id ? 1 : -1));
        onData(items);
      },
      (error) => {
        console.warn('Real-time circulars sync notification:', error.message || error);
        onError?.(error);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn('Failed to subscribe to circulars from Firestore:', error);
    onError?.(error);
    return () => {};
  }
}

/**
 * Subscribes to real-time gallery items from Firestore.
 */
export function subscribeToGallery(
  onData: (photos: GalleryItem[]) => void,
  onError?: (err: unknown) => void
): () => void {
  try {
    const q = collection(db, GALLERY_COLLECTION);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: GalleryItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as GalleryItem);
        });
        // Sort newest first
        items.sort((a, b) => (b.id > a.id ? 1 : -1));
        onData(items);
      },
      (error) => {
        console.warn('Real-time gallery sync notification:', error.message || error);
        onError?.(error);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn('Failed to subscribe to gallery from Firestore:', error);
    onError?.(error);
    return () => {};
  }
}

/**
 * Saves a circular to Firestore.
 */
export async function saveCircular(notice: Notice) {
  const path = `${CIRCULARS_COLLECTION}/${notice.id}`;
  try {
    const docRef = doc(db, CIRCULARS_COLLECTION, notice.id);
    await setDoc(docRef, {
      ...notice,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Deletes a circular from Firestore.
 */
export async function removeCircular(noticeId: string) {
  const path = `${CIRCULARS_COLLECTION}/${noticeId}`;
  try {
    const docRef = doc(db, CIRCULARS_COLLECTION, noticeId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Saves a photo to Firestore.
 */
export async function savePhoto(photo: GalleryItem) {
  const path = `${GALLERY_COLLECTION}/${photo.id}`;
  try {
    const docRef = doc(db, GALLERY_COLLECTION, photo.id);
    await setDoc(docRef, {
      ...photo,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Deletes a photo from Firestore.
 */
export async function removePhoto(photoId: string) {
  const path = `${GALLERY_COLLECTION}/${photoId}`;
  try {
    const docRef = doc(db, GALLERY_COLLECTION, photoId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
