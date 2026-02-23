import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/api/firebaseApp.js'

async function createFirebaseUserCollection (
  uid,
  userName,
  email,
  imageUrl,
  lastLogin,
  registeredAt,
  theme,
  points,
) {
  await setDoc(doc(db, 'users', uid), {
    userName,
    email,
    imageUrl,
    lastLogin,
    registeredAt,
    theme,
    points,
  })
}

export default createFirebaseUserCollection
