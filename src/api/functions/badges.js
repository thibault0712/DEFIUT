const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");

const ALAN_TURING_BADGE_ID = "alanTuring";
const ALAN_TURING_BADGE = {
  name: "Badge Alan Turing",
  icon: "mdi-lock",
};

function isCryptoChallenge(challengeData) {
  const category = String(challengeData?.category || "").toLowerCase();
  const tags = Array.isArray(challengeData?.tags) ? challengeData.tags : [];

  if (category.includes("crypto") || category.includes("cryptographie")) {
    return true;
  }

  return tags.some((tag) => String(tag).toLowerCase().includes("crypto"));
}

async function awardAlanTuringBadge({db, uid, challengeId}) {
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

module.exports = {
  checkAlanTuringBadge,
  awardAlanTuringBadge,
};