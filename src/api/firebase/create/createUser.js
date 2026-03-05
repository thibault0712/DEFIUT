import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/api/firebaseApp.js'

async function createUser (
  uid,
  userName,
  email,
  imageUrl,
  lastLogin,
  registeredAt,
  theme,
  points,
  challenges = {},
) {
  await setDoc(doc(db, 'users', uid), {
    userName,
    email,
    imageUrl,
    lastLogin,
    registeredAt,
    theme,
    points,
    challenges,
  })
}

export default createUser
