import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/api/firebaseApp.js'

async function updateFirebaseUserCollection (
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

export default updateFirebaseUserCollection
