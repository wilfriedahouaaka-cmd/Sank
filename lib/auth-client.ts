import { createAuthClient } from "better-auth/react";

/**
 * Client Better Auth cote navigateur (hooks React : useSession, etc.).
 * baseURL omiti : le client derive l'origine de la page courante
 * (localhost:3000 en dev, domaine Vercel en prod). Simple et sans doublon.
 */
export const authClient = createAuthClient();
