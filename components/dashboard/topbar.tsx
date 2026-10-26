import { BoutonDeconnexion } from "@/components/dashboard/bouton-deconnexion";

/**
 * Barre d'en-tête du dashboard.
 * - `centre` : nom réel du centre du directeur connecté (venu de la
 *   base via le layout). Placeholder si le centre n'existe pas encore.
 * - Déconnexion : appel authClient.signOut (composant client inclus).
 */
export function Topbar({ centre }: { centre: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
      {/* Nom du centre réel (ou placeholder tant que non créé) */}
      <p className="text-sm font-medium text-muted-foreground">{centre}</p>

      <BoutonDeconnexion />
    </header>
  );
}
