import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Client Drizzle typé, partagé par toute l'application.
 * - neon() : pilote serverless de Neon — un simple fetch HTTP,
 *   idéal sur Vercel (pas de connexion TCP persistante à gérer).
 * - schema : passe le schéma pour que db.query.documents... existe
 *   avec l'auto-complétion complète.
 */

// Fail fast : message clair si la variable manque (côté runtime_Node).
const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL manquante. Copie .env.example vers .env et colle ta connection string Neon.",
  );
}

export const db = drizzle(neon(url), { schema });
