"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { centres, documents } from "@/db/schema";
import { db } from "@/db";
import { obtenirSession } from "@/lib/session";

/**
 * Server Actions du dashboard — la logique métier est ICI, pas dans
 * les composants. Chaque action :
 *   1. valide les entrees avec Zod (defense cote serveur, le front ne sert qu'a guider),
 *   2. verifie la session (jamais de confiance a l'appelant),
 *   3. touche la base via Drizzle,
 *   4. revalide les chemins concernés / redirige.
 */

/* ===== Etat partage par les formulaires ===== */

export type EtatCreation = { erreur: string | null };
export const ETAT_INITIAL_CREATION: EtatCreation = { erreur: null };

/* ===== Schemas Zod ===== */

// Nom de centre : 2 a 80 caracteres une fois espaces jetés
const schemaNomCentre = z
  .string()
  .trim()
  .min(2, "Le nom du centre doit contenir au moins 2 caracteres.")
  .max(80, "Le nom du centre ne doit pas depasser 80 caracteres.");

const schemaDocument = z.object({
  nomEtudiant: z
    .string()
    .trim()
    .min(2, "Le nom de l'etudiant doit contenir au moins 2 caracteres.")
    .max(80, "Le nom de l'etudiant ne doit pas depasser 80 caracteres."),
  cours: z
    .string()
    .trim()
    .min(2, "Le cours doit contenir au moins 2 caracteres.")
    .max(80, "Le cours ne doit pas depasser 80 caracteres."),
});

// Libre a la V1.2 d'ajouter d'autres statuts (Genere, Correct...)
const STATUT_INITIAL = "En attente";

/* ===== Creation de centre =====
   - idempotente : un second appel ne plante pas (cas de recuperation)
   - appelee depuis les formulaires useActionState OU depuis la page inscription */

export async function creerCentreDepuisInscription(
  nomCentre: string,
): Promise<EtatCreation> {
  const validation = schemaNomCentre.safeParse(nomCentre);
  if (!validation.success) {
    return { erreur: validation.error.issues[0]?.message ?? "Nom de centre invalide." };
  }

  const session = await obtenirSession();
  if (!session) {
    return { erreur: "Session expirée. Reconnecte-toi puis reessaie." };
  }

  try {
    await db.insert(centres).values({
      nom: validation.data,
      userId: session.user.id,
    });
  } catch (e) {
    // Violation unique (code 23505 Postgres) : le directeur a deja un
    // centre — ce n'est pas une erreur pour l'utilisateur, on sort proprement.
    const message = e instanceof Error ? e.message : String(e);
    const uniqueViole = message.includes("centres_user_id_unique") || message.includes("23505");
    if (!uniqueViole) {
      return { erreur: "Creation du centre impossible. Reessaie dans un moment." };
    }
  }

  revalidatePath("/dashboard");
  return { erreur: null };
}

export async function actionCreerCentre(
  _etat: EtatCreation,
  formData: FormData,
): Promise<EtatCreation> {
  return creerCentreDepuisInscription(formData.get("nom")?.toString() ?? "");
}

/* ===== Creation de document ===== */

export async function actionCreerDocument(
  _etat: EtatCreation,
  formData: FormData,
): Promise<EtatCreation> {
  const validation = schemaDocument.safeParse({
    nomEtudiant: formData.get("nomEtudiant")?.toString() ?? "",
    cours: formData.get("cours")?.toString() ?? "",
  });
  if (!validation.success) {
    return { erreur: validation.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const session = await obtenirSession();
  if (!session) {
    return { erreur: "Session expirée. Reconnecte-toi puis reessaie." };
  }

  // Le document appartient au centre du directeur connecté : jamais
  // un centreId du client (jamais fiable — falsifiable).
  const centre = await db.query.centres.findFirst({
    where: eq(centres.userId, session.user.id),
  });
  if (!centre) {
    return { erreur: "Crée d'abord ton centre de formation." };
  }

  try {
    await db.insert(documents).values({
      nomEtudiant: validation.data.nomEtudiant,
      cours: validation.data.cours,
      statut: STATUT_INITIAL,
      centreId: centre.id,
    });
  } catch {
    return { erreur: "Creation du document impossible. Reessaie dans un moment." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
