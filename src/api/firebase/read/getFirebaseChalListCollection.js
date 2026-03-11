import { collection, getDocs, query, startAfter } from 'firebase/firestore'
import { db } from '@/api/firebaseApp.js'

async function getFirebaseChalListCollection (
  lastDocFromPreviousPage,
) {
  const q = lastDocFromPreviousPage
    ? query(
        collection(db, 'challenges'),
        startAfter(lastDocFromPreviousPage),
      )
    : query(collection(db, 'challenges'))

  const snap = await getDocs(q)
  const challenges = snap.docs.map(d => ({ uid: d.id, ...d.data() }))
  const lastDoc = snap.docs.at(-1) || null

  return { challenges, lastDoc }
}

export default getFirebaseChalListCollection
