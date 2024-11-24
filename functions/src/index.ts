/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// const { Storage } = require('@google-cloud/storage');

admin.initializeApp();

const bucket = admin.storage().bucket();

export const uploadImage = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated to call this function.'
    );
  }
  
  try {
    const { imageBase64, filename } = data;

    if (!imageBase64 || !filename) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function must be called with "imageBase64" and "filename" arguments.'
      );
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(imageBase64, 'base64');

    // Create a reference to the file in Firebase Storage
    const file = bucket.file(`images/${filename}`);

    // Upload the file
    await file.save(buffer, {
      metadata: {
        contentType: 'image/jpeg', // or dynamically set based on the file type
      },
    });

    // Make the file publicly accessible
    await file.makePublic();

    // Generate public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    return { image: publicUrl };
  } catch (error: any) {
    console.error(error);
    throw new functions.https.HttpsError('internal', `Failed to upload image.${error.message}`);
  }
});

export const createUser = functions.https.onCall(async (data, context) => {
  // Check authentication
  if (!context.auth || !context.auth.token) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Request does not have valid authentication.'
    );
  }

  const { email, password, username, role } = data;

  if (!email || !password || !username || !role) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "email", "password", "username", and "role".'
    );
  }

  try {
    // Create the user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

    // Set custom claims for the role (admin or owner)
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    return { message: `User created successfully with UID: ${userRecord.uid}`, status: 'success', uuid: userRecord.uid };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to create user.'
    );
  }
});

export const setCustomClaims = functions.https.onCall(async (data, context) => {
  // Check authentication
  if (!context.auth || !context.auth.token) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Request does not have valid authentication.'
    );
  }

  const { uid, role } = data;

  if (!uid || !role) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "uid" and "role".'
    );
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    return { message: `Custom claims for UID ${uid} set to role: ${role}` };
  } catch (error) {
    console.error('Error setting custom claims:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to set custom claims.'
    );
  }
});
