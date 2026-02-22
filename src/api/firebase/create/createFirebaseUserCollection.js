import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/api/firebase/firebaseApp.js'

async function createFirebaseUserCollection (
  uid,
  userName,
  email,
  imageUrl,
  lastLogin,
  registeredAt,
  theme,
) {
  await setDoc(doc(db, 'users', uid), {
    userName,
    email,
    imageUrl,
    lastLogin,
    registeredAt,
    theme,
  })
}

export default createFirebaseUserCollection
