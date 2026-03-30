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
