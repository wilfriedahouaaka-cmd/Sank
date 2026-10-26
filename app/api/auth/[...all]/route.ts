import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

/**
 * Montage des endpoints de Better Auth sur /api/auth/*.
 * Next.js route handler : GET pour la session etc., POST pour
 * connexion / inscription / deconnexion. Passe-partout — rien
 * a modifier ici quand on ajoute des plugins mieux tard.
 */
export const { GET, POST } = toNextJsHandler(auth);
