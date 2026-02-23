import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { db } from '@/api/firebaseApp.js'

const PAGE_SIZE = 25

async function getFirebaseUserListCollection (
  lastDocFromPreviousPage,
) {
  const q = lastDocFromPreviousPage
    ? query(
        collection(db, 'users'),
        orderBy('points', 'desc'),
        startAfter(lastDocFromPreviousPage),
        limit(PAGE_SIZE),
      )
    : query(collection(db, 'users'), orderBy('points', 'desc'), limit(PAGE_SIZE))

  const snap = await getDocs(q)
  const users = snap.docs.map(d => ({ uid: d.id, ...d.data() }))
  const lastDoc = snap.docs.at(-1) || null

  return { users, lastDoc }
}

export default getFirebaseUserListCollection
