import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/api/firebase/firebaseApp.js'

async function getFirebaseUserCollection (
  uid,
) {
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)

  if (snap.exists()) {
    return {
      uid,
      ...snap.data() }
  }

  return null
}

export default getFirebaseUserCollection
