import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/api/firebaseApp.js';

async function updateUser(
  uid,
  userName,
  email,
  imageUrl,
  lastLogin,
  registeredAt,
  theme,
  points,
  challenges,
  badges,
  startedChallenges = {},
  completedChallenges = {},
) {
  await setDoc(doc(db, 'users', uid), {
    userName,
    email,
    imageUrl,
    lastLogin,
    registeredAt,
    theme,
    points,
    challenges: challenges || {},
    badges: badges || {},
    startedChallenges: startedChallenges || {},
    completedChallenges: completedChallenges || {},
  });
}

export default updateUser;
