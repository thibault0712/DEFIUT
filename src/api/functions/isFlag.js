const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const {
  awardAlanTuringBadge,
  awardRichardHammingBadge,
  registerFailedAttempt,
} = require('./badges');

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

  // Récupération du défi (métadonnées publiques)
  const challengeRef = db.collection('challenges').doc(challengeId);
  const challengeSnap = await challengeRef.get();

  if (!challengeSnap.exists) {
    throw new HttpsError('not-found', 'Défi introuvable.');
  }

  const challengeData = challengeSnap.data();

  // Récupération du flag depuis la collection sécurisée (inaccessible aux clients)
  const flagRef = db.collection('flags').doc(challengeId);
  const flagSnap = await flagRef.get();

  if (!flagSnap.exists) {
    throw new HttpsError('not-found', 'Flag non configuré pour ce défi.');
  }

  // Vérification que le flag correspond (insensible à la casse + espaces)
  const submittedFlag = flag.trim().toLowerCase();
  const correctFlag = (flagSnap.data().flag || '').trim().toLowerCase();

  if (submittedFlag !== correctFlag) {
    // Enregistre l'échec pour permettre le badge Richard Hamming plus tard
    try {
      await registerFailedAttempt({db, uid, challengeId});
    } catch {
      // Le tracking d'échec ne doit pas casser la réponse utilisateur
    }
    return { success: false, message: 'Flag incorrect.' };
  }

  // Vérification + mise à jour en transaction pour éviter les doubles validations
  const userRef = db.collection('users').doc(uid);

  const alreadyCompleted = await db.runTransaction(async (transaction) => {
    const userSnap = await transaction.get(userRef);

    if (!userSnap.exists) {
      throw new HttpsError('not-found', 'Utilisateur introuvable.');
    }

    const userData = userSnap.data();

    if (userData.challenges && userData.challenges[challengeId]) {
      return true;
    }

    transaction.update(userRef, {
      [`challenges.${challengeId}`]: {
        title: challengeData.title,
        date: FieldValue.serverTimestamp(),
        points: challengeData.points,
      },
      points: FieldValue.increment(challengeData.points),
    });

    return false;
  });

  if (alreadyCompleted) {
    return { success: false, message: 'Vous avez déjà validé ce défi.' };
  }

  // Attribution non bloquante du badge Alan Turing (si défi crypto)
  let badgeAwarded = false;
  let alanTuringAwarded = false;
  let richardHammingAwarded = false;
  try {
    const badgeResult = await awardAlanTuringBadge({db, uid, challengeId});
    alanTuringAwarded = badgeResult.awarded;
  } catch {
    // L'attribution de badge ne doit pas bloquer la validation du défi.
  }

  // Attribution non bloquante du badge Richard Hamming (après échec préalable)
  try {
    const badgeResult = await awardRichardHammingBadge({db, uid, challengeId});
    richardHammingAwarded = badgeResult.awarded;
  } catch {
    // L'attribution de badge ne doit pas bloquer la validation du défi.
  }

  badgeAwarded = alanTuringAwarded || richardHammingAwarded;

  return {
    success: true,
    badgeAwarded,
    badgesAwarded: {
      alanTuring: alanTuringAwarded,
      richardHamming: richardHammingAwarded,
    },
    message: `Félicitations ! Vous avez gagné ${challengeData.points} points.`,
  };
});

module.exports = { isFlag };
