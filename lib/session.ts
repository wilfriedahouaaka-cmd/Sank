import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Lecture de la session Better Auth cote serveur (Server Components
 * et Server Actions). Next 16 : headers() est asynchrone.
 * Renverra null si aucun directeur n'est connecté.
 */
export async function obtenirSession() {
  const entetes = await headers();
  return auth.api.getSession({ headers: entetes });
}

/** Type utilitaire : la session ( utilisateur inclus ) quand elle existe. */
export type SessionUtilisateur = NonNullable<
  Awaited<ReturnType<typeof obtenirSession>>
>;
