import { Navigation } from "@/components/landing/navigation";
import { PiedDePage } from "@/components/landing/pied-de-page";

/**
 * Fabrique du site public : navigation fixe en haut, contenu au
 * milieu, footer partout en bas. Le wrapper .theme-public passe tout
 * le sous-arbre en thème clair (voir globals.css) — le dashboard,
 * en dehors de ce wrapper, reste sombre.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-public min-h-dvh bg-background font-sans text-foreground">
      <Navigation />
      <main>{children}</main>
      <PiedDePage />
    </div>
  );
}
