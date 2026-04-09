const {onCall, HttpsError} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

/**
 * Cloud Function pour gérer l'accès aux indices des défis
 * - Vérifie si l'utilisateur a déjà payé pour cet indice
 * - Si oui: retourne l'indice sans déduire les points
 * - Si non: déduit le coût de l'indice des points de l'utilisateur et enregistre l'achat
 */
exports.getHint = onCall(async (request) => {
  try {
    // Vérifier que l'utilisateur est authentifié
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Utilisateur non authentifié.");
    }

    const userId = request.auth.uid;
    const {challengeId, hintId} = request.data;

    // Valider les paramètres
    if (!challengeId || !hintId) {
      throw new HttpsError("invalid-argument", "Paramètres manquants : challengeId, hintId.");
    }

    const db = admin.firestore();

    // Récupérer le coût réel de l'indice depuis la base
    const challengeDoc = await db.collection("challenges").doc(challengeId).get();
    if (!challengeDoc.exists) {
      throw new HttpsError("not-found", "Défi non trouvé.");
    }
    const clues = challengeDoc.data().clues || [];
    const clue = clues.find((c) => c.id === hintId);
    if (!clue) {
      throw new HttpsError("not-found", "Indice non trouvé dans le défi.");
    }
    const hintCost = clue.points;

    // Référence au document utilisateur
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new HttpsError("not-found", "Utilisateur non trouvé.");
    }

    const userData = userDoc.data();
    const currentPoints = userData.points || 0;

    // Chemin pour stocker les indices achetés par l'utilisateur
    const hintsPurchasedRef = userRef.collection("hintsPurchased").doc(challengeId);
    const hintsPurchasedDoc = await hintsPurchasedRef.get();

    let purchasedHints = [];
    if (hintsPurchasedDoc.exists) {
      purchasedHints = hintsPurchasedDoc.data().hints || [];
    }

    // Vérifier si l'indice a déjà été acheté
    const hintAlreadyPurchased = purchasedHints.includes(hintId);

    if (hintAlreadyPurchased) {
      logger.info(`User ${userId} accessing already purchased hint ${hintId} for challenge ${challengeId}`);
      return {
        success: true,
        message: "Indice déjà acheté - aucun point déduit",
        hintsRemaining: currentPoints,
      };
    }

    // Vérifier que l'utilisateur a assez de points
    if (currentPoints < hintCost) {
      logger.warn(`User ${userId} insufficient points for hint ${hintId}. Required: ${hintCost}, Available: ${currentPoints}`);
      throw new HttpsError("failed-precondition", `Points insuffisants. Requis : ${hintCost}, Disponibles : ${currentPoints}.`);
    }

    // Déduire les points et enregistrer l'achat dans une transaction
    await db.runTransaction(async (transaction) => {
      // Récupérer les données actuelles pour s'assurer qu'elles n'ont pas changé
      const currentUserDoc = await transaction.get(userRef);
      const currentUserData = currentUserDoc.data();
      const updatedPoints = (currentUserData.points || 0) - hintCost;

      // Mettre à jour les points de l'utilisateur
      transaction.update(userRef, {
        points: updatedPoints,
        lastHintPurchaseDate: admin.firestore.Timestamp.now(),
      });

      // Enregistrer l'indice acheté
      const updatedHints = [...purchasedHints, hintId];
      transaction.set(
          hintsPurchasedRef,
          {
            hints: updatedHints,
            lastPurchaseDate: admin.firestore.Timestamp.now(),
          },
          {merge: true},
      );
    });

    logger.info(`User ${userId} purchased hint ${hintId} for challenge ${challengeId}. Cost: ${hintCost} points`);

    return {
      success: true,
      message: "Indice acheté avec succès",
      pointsDeducted: hintCost,
      hintsRemaining: currentPoints - hintCost,
    };
  } catch (error) {
    logger.error("Error in getHint function:", error);
    if (error instanceof HttpsError) throw error;
    throw new HttpsError("internal", "Une erreur est survenue lors du traitement de la demande d'indice.");
  }
});

/**
 * Cloud Function pour récupérer la liste des indices déjà achetés par l'utilisateur pour un challenge
 */
exports.getPurchasedHints = onCall(async (request) => {
  try {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Utilisateur non authentifié.");
    }

    const userId = request.auth.uid;
    const {challengeId} = request.data;

    if (!challengeId) {
      throw new HttpsError("invalid-argument", "Paramètre manquant : challengeId.");
    }

    const db = admin.firestore();
    const hintsPurchasedDoc = await db
        .collection("users")
        .doc(userId)
        .collection("hintsPurchased")
        .doc(challengeId)
        .get();

    if (!hintsPurchasedDoc.exists) {
      return {
        success: true,
        purchasedHints: [],
      };
    }

    return {
      success: true,
      purchasedHints: hintsPurchasedDoc.data().hints || [],
    };
  } catch (error) {
    logger.error("Error in getPurchasedHints function:", error);
    if (error instanceof HttpsError) throw error;
    throw new HttpsError("internal", "Une erreur est survenue lors de la récupération des indices achetés.");
  }
});

/**
 * Cloud Function pour vérifier les points actuels de l'utilisateur
 */
exports.getUserPoints = onCall(async (request) => {
  try {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Utilisateur non authentifié.");
    }

    const userId = request.auth.uid;
    const db = admin.firestore();

    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      throw new HttpsError("not-found", "Utilisateur non trouvé.");
    }

    return {
      success: true,
      points: userDoc.data().points || 0,
    };
  } catch (error) {
    logger.error("Error in getUserPoints function:", error);
    if (error instanceof HttpsError) throw error;
    throw new HttpsError("internal", "Une erreur est survenue lors de la récupération des points de l'utilisateur.");
  }
});
