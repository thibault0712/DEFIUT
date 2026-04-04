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
const ADA_LOVELACE_BADGE_ID = "adaLovelace";
const ADA_LOVELACE_BADGE = {
  name: "Badge Ada Lovelace",
  icon: "mdi-trophy",
};
const MARGARET_HAMILTON_BADGE_ID = "margaretHamilton";
const MARGARET_HAMILTON_BADGE = {
  name: "Badge Margaret Hamilton",
  icon: "mdi-rocket-launch",
};

function toMillis(value) {
  // Accepte les Timestamp Firestore + objets sérialisés éventuels
  if (!value) return null;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.seconds === "number") return value.seconds * 1000;
  if (typeof value._seconds === "number") return value._seconds * 1000;
  return null;
}

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

async function awardAdaLovelaceBadge({db, uid, challengeId, isFirstSolver}) {
  let canAward = isFirstSolver;

  // Si non précisé, on vérifie depuis le défi qui est le premier solveur enregistré
  if (typeof canAward !== "boolean") {
    const challengeRef = db.collection("challenges").doc(challengeId);
    const challengeSnap = await challengeRef.get();

    if (!challengeSnap.exists) {
      throw new HttpsError("not-found", "Défi introuvable.");
    }

    canAward = challengeSnap.data()?.firstSolverUid === uid;
  }

  if (!canAward) {
    return {awarded: false};
  }

  const userRef = db.collection("users").doc(uid);

  const awarded = await db.runTransaction(async (transaction) => {
    const userSnap = await transaction.get(userRef);

    if (!userSnap.exists) {
      throw new HttpsError("not-found", "Utilisateur introuvable.");
    }

    const userData = userSnap.data();
    const badges = userData.badges || {};

    if (badges[ADA_LOVELACE_BADGE_ID]) {
      return false;
    }

    transaction.update(userRef, {
      [`badges.${ADA_LOVELACE_BADGE_ID}`]: {
        ...ADA_LOVELACE_BADGE,
        challengeId,
        date: FieldValue.serverTimestamp(),
      },
    });

    return true;
  });

  return {awarded};
}

async function awardMargaretHamiltonBadge({db, uid, challengeId}) {
  const userRef = db.collection("users").doc(uid);
  const now = Date.now();
  const last24HoursThreshold = now - (24 * 60 * 60 * 1000);

  const awarded = await db.runTransaction(async (transaction) => {
    const userSnap = await transaction.get(userRef);

    if (!userSnap.exists) {
      throw new HttpsError("not-found", "Utilisateur introuvable.");
    }

    const userData = userSnap.data();
    const badges = userData.badges || {};

    if (badges[MARGARET_HAMILTON_BADGE_ID]) {
      return false;
    }

    // Compte les défis résolus sur les dernières 24h
    const challenges = userData.challenges || {};
    const solvedInLast24Hours = Object.values(challenges).reduce((count, entry) => {
      const solvedAt = toMillis(entry?.date);
      if (solvedAt !== null && solvedAt >= last24HoursThreshold) {
        return count + 1;
      }
      return count;
    }, 0);

    if (solvedInLast24Hours < 2) {
      return false;
    }

    transaction.update(userRef, {
      [`badges.${MARGARET_HAMILTON_BADGE_ID}`]: {
        ...MARGARET_HAMILTON_BADGE,
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

const checkAdaLovelaceBadge = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Vous devez être connecté.");
  }

  const {challengeId} = request.data;
  if (!challengeId || typeof challengeId !== "string") {
    throw new HttpsError("invalid-argument", "challengeId manquant ou invalide.");
  }

  const db = getFirestore();
  const uid = request.auth.uid;

  const result = await awardAdaLovelaceBadge({db, uid, challengeId});

  return {
    success: true,
    awarded: result.awarded,
    badgeId: result.awarded ? ADA_LOVELACE_BADGE_ID : null,
  };
});

const checkMargaretHamiltonBadge = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Vous devez être connecté.");
  }

  const db = getFirestore();
  const uid = request.auth.uid;
  const {challengeId} = request.data || {};

  const result = await awardMargaretHamiltonBadge({db, uid, challengeId});

  return {
    success: true,
    awarded: result.awarded,
    badgeId: result.awarded ? MARGARET_HAMILTON_BADGE_ID : null,
  };
});

module.exports = {
  checkAlanTuringBadge,
  checkRichardHammingBadge,
  checkAdaLovelaceBadge,
  checkMargaretHamiltonBadge,
  awardAlanTuringBadge,
  awardRichardHammingBadge,
  awardAdaLovelaceBadge,
  awardMargaretHamiltonBadge,
  registerFailedAttempt,
};