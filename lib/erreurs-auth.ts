/**
 * Traduit les messages d'erreur de Better Auth (en anglais) en
 * francais clair pour l'utilisateur.
 * Cas inconnu : on affiche le message brut — on n'invente jamais
 * une erreur qui ne correspond pas au probleme reel.
 */
const CORRESPONDANCES: Record<string, string> = {
  "Invalid email or password": "Email ou mot de passe incorrect.",
  "User already exists": "Un compte existe deja avec cet email. Essaie de te connecter.",
};

export function traduireErreurAuth(message: string | undefined | null): string {
  if (!message) {
    return "Une erreur est survenue. Reessaie.";
  }
  for (const [motif, traduction] of Object.entries(CORRESPONDANCES)) {
    if (message.includes(motif)) {
      return traduction;
    }
  }
  return message;
}
