/* ===== Point d'entrée unique du schéma =====
   Le client Drizzle (db/index.ts) et drizzle-kit lisent tout ici.
   - db/auth-schema.ts : tables Better Auth ( Générer par la CLI )
   - db/domaine.ts     : tables métier de Sank */

export * from "./auth-schema";
export * from "./domaine";
