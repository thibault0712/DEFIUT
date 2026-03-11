import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/api/firebaseApp.js'

async function getFirebaseChalCollection (
  challengeId,
) {
  const ref = doc(db, 'challenges', challengeId)
  const snap = await getDoc(ref)

  if (snap.exists()) {
    return {
      id: challengeId,
      ...snap.data() }
  }

  return null
}

export default getFirebaseChalCollection
