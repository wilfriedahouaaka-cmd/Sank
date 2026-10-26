import { defineConfig } from "drizzle-kit";
import "dotenv/config";

/**
 * Configuration de l'outil drizzle-kit (migrations, introspection).
 * - dialecte : PostgreSQL (Neon est du Postgres serverless)
 * - schema   : le fichier où sont déclarées les tables Sank
 * - out      : Drizzle générera ses migrations SQL ici
 */

// Garde-fou : message clair si la variable d'environnement manque,
// au lieu d'une erreur obscure de drizzle-kit.
const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL manquante. Copie .env.example vers .env et colle ta connection string Neon.",
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: { url },
});
