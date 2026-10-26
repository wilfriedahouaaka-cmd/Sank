/**
 * scripts/vide-base.mjs — Reset complet des DONNÉES de la base Sank.
 *
 * - Vide : documents, centres, session, account, verification, user.
 * - Garde : les TABLES et leurs colonnes (structure intacte).
 * - TRUNCATE ... RESTART IDENTITY CASCADE : contourne les clés
 *   étrangères et remet les compteurs (uuid/identity) à zéro.
 *
 * Usage :  node scripts/vide-base.mjs --oui
 * Sans "--oui", le script n'affiche que l'aperçu — impossible de
 * vider la base par accident.
 */
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "DATABASE_URL manquante. Vérifie ton fichier .env (voir .env.example).",
  );
  process.exit(1);
}

// Garde-fou volontaire : aucune suppression sans accord explicite.
if (!process.argv.includes("--oui")) {
  console.log(
    "⚠️  Ce script vide TOUTES les données (comptes, centres, documents...)\n" +
      "   sans supprimer les tables. Il est irréversible.\n\n" +
      "   Pour confirmer :  node scripts/vide-base.mjs --oui\n",
  );
  process.exit(0);
}

const sql = neon(url);

/* 1 — Compte AVANT nettoyage (pour prouver ce qui disparaît) */
const lignes = await sql`
  SELECT
    (SELECT count(*)::int FROM documents)     AS documents,
    (SELECT count(*)::int FROM centres)       AS centres,
    (SELECT count(*)::int FROM session)       AS sessions,
    (SELECT count(*)::int FROM account)       AS accounts,
    (SELECT count(*)::int FROM verification)  AS verifications,
    (SELECT count(*)::int FROM "user")        AS utilisateurs
`;
console.log("AVANT le nettoyage :");
console.table(lignes[0]);

/* 2 — TRUNCATE unique avec CASCADE :
   - ordre demandé respecté par la logique de la requête (le moteur
     règle lui-même les dépendances de clés étrangères),
   - "user" est un mot SQL réservé : il est toujours entre guillemets. */
await sql`TRUNCATE TABLE
  documents, centres, session, account, verification, "user"
  RESTART IDENTITY CASCADE`;

/* 3 — Vérification : chaque table doit égaler EXACTEMENT 0 ligne. */
const apres = await sql`
  SELECT
    (SELECT count(*)::int FROM documents)     AS documents,
    (SELECT count(*)::int FROM centres)       AS centres,
    (SELECT count(*)::int FROM session)       AS sessions,
    (SELECT count(*)::int FROM account)       AS accounts,
    (SELECT count(*)::int FROM verification)  AS verifications,
    (SELECT count(*)::int FROM "user")        AS utilisateurs
`;
console.log("\nAPRES le nettoyage :");
console.table(apres[0]);

const valeurs = Object.values(apres[0] ?? {});
const propre = valeurs.every((n) => Number(n) === 0);
console.log(
  propre
    ? "\n✅ BASE PROPRE — toutes les tables sont vides, structure intacte."
    : "\n❌ ÉCHEC — certaines tables contiennent encore des lignes.",
);
process.exit(propre ? 0 : 1);
