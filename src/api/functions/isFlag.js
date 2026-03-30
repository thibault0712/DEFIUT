const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

/**
 * Valide le flag soumis par l'utilisateur pour un défi donné.
 *
 * Données attendues : { challengeId: string, flag: string }
 * Retourne         : { success: boolean, message: string }
 */
const isFlag = onCall({ enforceAppCheck: false }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Vous devez être connecté pour valider un flag.');
  }

  const { challengeId, flag } = request.data;

  if (!challengeId || typeof challengeId !== 'string') {
    throw new HttpsError('invalid-argument', 'challengeId manquant ou invalide.');
  }
  if (!flag || typeof flag !== 'string') {
    throw new HttpsError('invalid-argument', 'Flag manquant ou invalide.');
  }

  const db = getFirestore();
  const uid = request.auth.uid;

  // Récupération du défi
  const challengeRef = db.collection('challenges').doc(challengeId);
  const challengeSnap = await challengeRef.get();

  if (!challengeSnap.exists) {
    throw new HttpsError('not-found', 'Défi introuvable.');
  }

  const challengeData = challengeSnap.data();

  // Vérification que le flag correspond (insensible à la casse + espaces)
  const submittedFlag = flag.trim().toLowerCase();
  const correctFlag = (challengeData.flag || '').trim().toLowerCase();

  if (submittedFlag !== correctFlag) {
    return { success: false, message: 'Flag incorrect.' };
  }

  // Vérification que le défi n'est pas déjà validé par cet utilisateur
  const userRef = db.collection('users').doc(uid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    throw new HttpsError('not-found', 'Utilisateur introuvable.');
  }

  const userData = userSnap.data();

  if (userData.challenges && userData.challenges[challengeId]) {
    return { success: false, message: 'Vous avez déjà validé ce défi.' };
  }

  // Mise à jour du document utilisateur
  await userRef.update({
    [`challenges.${challengeId}`]: {
      title: challengeData.title,
      date: FieldValue.serverTimestamp(),
      points: challengeData.points,
    },
    points: FieldValue.increment(challengeData.points),
  });

  return {
    success: true,
    message: `Félicitations ! Vous avez gagné ${challengeData.points} points.`,
  };
});

module.exports = { isFlag };
