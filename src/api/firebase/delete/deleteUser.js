import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/api/firebaseApp.js';

async function deleteUser(uid) {
  await deleteDoc(doc(db, 'users', uid));
  return true;
}

export default deleteUser;
