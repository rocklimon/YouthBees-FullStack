import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "serviceAccountKey.json"),
    "utf-8"
  )
);

const app = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth(app);

export default app;