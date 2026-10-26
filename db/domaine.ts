/* ===== Tables métier de Sank =====
   Notre domaine à nous (distinct du schéma Better Auth db/auth-schema.ts).
   V1 : 1 directeur = 1 centre (contrainte d'unicité sur userId) ;
   les équipes/invitations pourront être ajoutées plus tard sans casse. */

import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  index,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

/**
 * Centre de formation : le client principal de Sank.
 * Aujourd'hui détenu par un unique directeur (userId unique).
 */
export const centres = pgTable(
  "centres",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    nom: text("nom").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  // Un directeur ne possede qu'un centre : l'index unique est la garantie
  // au niveau base, pas seulement dans le code.
  (table) => [uniqueIndex("centres_user_id_unique").on(table.userId)],
);

/**
 * Document (attestation, certificat...) destiné à un étudiant.
 * `statut` est un simple text pour la V1 ("En attente" / "Envoyé") —
 * un enum PostgreSQL coté DB deviendra utile quand le flux WhatsApp
 * enverra vraiment ; on garde simple tant que le controle est applicatif.
 * PDF et IA ne font pas partie de la V1 : aucune colonne fichier ici.
 */
export const documents = pgTable(
  "documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    nomEtudiant: text("nom_etudiant").notNull(),
    cours: text("cours").notNull(),
    statut: text("statut").notNull().default("En attente"),
    centreId: uuid("centre_id")
      .notNull()
      .references(() => centres.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("documents_centre_id_idx").on(table.centreId)],
);

/* Relations typées pour l'API relationnelle de Drizzle (db.query). */

export const centresRelations = relations(centres, ({ one, many }) => ({
  directeur: one(user, {
    fields: [centres.userId],
    references: [user.id],
  }),
  documents: many(documents),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  centre: one(centres, {
    fields: [documents.centreId],
    references: [centres.id],
  }),
}));
