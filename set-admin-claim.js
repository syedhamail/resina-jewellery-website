const admin = require("firebase-admin");

// Service Account Key se initialize karo
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function setAdminClaim() {
  const uid = "UOxZ7nrEa3TA2hUkNwICI7Gr2QD2"; // Tera UID
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log("Admin role set successfully for UID:", uid);
  } catch (error) {
    console.error("Error setting admin role:", error);
  }
}

setAdminClaim();