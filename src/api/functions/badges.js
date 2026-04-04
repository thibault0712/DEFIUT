const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");

const ALAN_TURING_BADGE_ID = "alanTuring";
const ALAN_TURING_BADGE = {
  name: "Badge Alan Turing",
  icon: "mdi-lock",
};
const RICHARD_HAMMING_BADGE_ID = "richardHamming";
const RICHARD_HAMMING_BADGE = {
  name: "Badge Richard Hamming",
  icon: "mdi-target",
};

function isCryptoChallenge(challengeData) {
  // On tolère les deux formes: "crypto" et "cryptographie"
  const category = String(challengeData?.category || "").toLowerCase();
  const tags = Array.isArray(challengeData?.tags) ? challengeData.tags : [];

  if (category.includes("crypto") || category.includes("cryptographie")) {
    return true;
  }

  return tags.some((tag) => String(tag).toLowerCase().includes("crypto"));
}

async function awardAlanTuringBadge({db, uid, challengeId}) {
  // Vérifie la nature du défi à partir des métadonnées Firestore
  const challengeRef = db.collection("challenges").doc(challengeId);
  const challengeSnap = await challengeRef.get();

  if (!challengeSnap.exists) {
    throw new HttpsError("not-found", "Défi introuvable.");
  }

  if (!isCryptoChallenge(challengeSnap.data())) {
    return {awarded: false};
  }

  const userRef = db.collection("users").doc(uid);

  const awarded = await db.runTransaction(async (transaction) => {
    // Transaction pour éviter une double attribution concurrente
    const userSnap = await transaction.get(userRef);

    if (!userSnap.exists) {
      throw new HttpsError("not-found", "Utilisateur introuvable.");
    }

    const userData = userSnap.data();
    const badges = userData.badges || {};

    if (badges[ALAN_TURING_BADGE_ID]) {
      return false;
    }

    transaction.update(userRef, {
      [`badges.${ALAN_TURING_BADGE_ID}`]: {
        ...ALAN_TURING_BADGE,
        challengeId,
        date: FieldValue.serverTimestamp(),
      },
    });

    return true;
  });

  return {awarded};
}

async function registerFailedAttempt({db, uid, challengeId}) {
  const userRef = db.collection("users").doc(uid);

  await db.runTransaction(async (transaction) => {
    const userSnap = await transaction.get(userRef);

    if (!userSnap.exists) {
      throw new HttpsError("not-found", "Utilisateur introuvable.");
    }

    // Compteur d'essais ratés par défi (clé = challengeId)
    transaction.update(userRef, {
      [`failedAttempts.${challengeId}`]: FieldValue.increment(1),
    });
  });
}

async function awardRichardHammingBadge({db, uid, challengeId}) {
  const userRef = db.collection("users").doc(uid);

  const awarded = await db.runTransaction(async (transaction) => {
    const userSnap = await transaction.get(userRef);

    if (!userSnap.exists) {
      throw new HttpsError("not-found", "Utilisateur introuvable.");
    }

    const userData = userSnap.data();
    const badges = userData.badges || {};
    const failedAttempts = userData.failedAttempts || {};
    const challengeFailedAttempts = Number(failedAttempts[challengeId] || 0);

    if (badges[RICHARD_HAMMING_BADGE_ID]) {
      return false;
    }

    // Attribué uniquement si la résolution suit au moins un essai raté
    if (challengeFailedAttempts < 1) {
      return false;
    }

    transaction.update(userRef, {
      [`badges.${RICHARD_HAMMING_BADGE_ID}`]: {
        ...RICHARD_HAMMING_BADGE,
        challengeId,
        date: FieldValue.serverTimestamp(),
      },
    });

    return true;
  });

  return {awarded};
}

const checkAlanTuringBadge = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Vous devez être connecté.");
  }

  const {challengeId} = request.data;
  if (!challengeId || typeof challengeId !== "string") {
    throw new HttpsError("invalid-argument", "challengeId manquant ou invalide.");
  }

  const db = getFirestore();
  const uid = request.auth.uid;

  const result = await awardAlanTuringBadge({db, uid, challengeId});

  return {
    success: true,
    awarded: result.awarded,
    badgeId: result.awarded ? ALAN_TURING_BADGE_ID : null,
  };
});

const checkRichardHammingBadge = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Vous devez être connecté.");
  }

  const {challengeId} = request.data;
  if (!challengeId || typeof challengeId !== "string") {
    throw new HttpsError("invalid-argument", "challengeId manquant ou invalide.");
  }

  const db = getFirestore();
  const uid = request.auth.uid;

  const result = await awardRichardHammingBadge({db, uid, challengeId});

  return {
    success: true,
    awarded: result.awarded,
    badgeId: result.awarded ? RICHARD_HAMMING_BADGE_ID : null,
  };
});

module.exports = {
  checkAlanTuringBadge,
  checkRichardHammingBadge,
  awardAlanTuringBadge,
  awardRichardHammingBadge,
  registerFailedAttempt,
};