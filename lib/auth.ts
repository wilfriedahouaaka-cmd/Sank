import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

/**
 * Configuration serveur de Better Auth.
 *
 * - database : notre client Drizzle existant (Neon/Postgres). Better Auth
 *   s'appuie SUR notre base, aucune base séparée.
 * - provider "pg" : PostgreSQL — pilote neon-http côté serveless (Vercel).
 * - emailAndPassword : connexion par email + mot de passe (les directeurs
 *   de centres). Pas d'OAuth social pour l'instant (KISS).
 * - minPasswordLength 8 : plancher raisonnable ; Better Auth applique
 *   aussi des règles de force par défaut côté client/serveur.
 *
 * Les tables (user, session, account, verification) sont générées par la
 * CLI Better Auth dans db/schema.ts — jamais écrites à la main ici.
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
});
