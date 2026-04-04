/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { initializeApp } = require('firebase-admin/app');
const { setGlobalOptions } = require('firebase-functions');

initializeApp();
setGlobalOptions({ maxInstances: 10 });

const { isFlag } = require('./isFlag');

exports.isFlag = isFlag;
// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Import hints management functions
const {getHint, getPurchasedHints, getUserPoints} = require("./hints");
const {checkAlanTuringBadge, checkRichardHammingBadge} = require("./badges");

exports.getHint = getHint;
exports.getPurchasedHints = getPurchasedHints;
exports.getUserPoints = getUserPoints;
exports.checkAlanTuringBadge = checkAlanTuringBadge;
exports.checkRichardHammingBadge = checkRichardHammingBadge;
