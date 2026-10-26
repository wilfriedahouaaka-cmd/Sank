import Link from "next/link";

/**
 * Footer clair et aéré : la signature serif à gauche, deux colonnes de
 * liens (site + compte) à droite, une barre discrète en bas.
 */
export function PiedDePage() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Signature : baseline de marque */}
          <div className="md:col-span-6">
            <p className="font-display text-2xl text-foreground">
              Sank<span className="text-primary">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              Le document que vos étudiants garderont. Conçu pour les centres
              de formation d'Abidjan et de Côte d'Ivoire.
            </p>
          </div>

          {/* Colonne site */}
          <nav aria-label="Liens du site" className="md:col-span-3">
            <p className="text-sm font-medium text-foreground">Site</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {[
                { href: "/", label: "Accueil" },
                { href: "/fonctionnalites", label: "Fonctionnalités" },
                { href: "/tarifs", label: "Tarifs" },
                { href: "/contact", label: "Contact" },
              ].map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Colonne compte */}
          <nav aria-label="Liens de compte" className="md:col-span-3">
            <p className="text-sm font-medium text-foreground">Compte</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <Link
                  href="/connexion"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Se connecter
                </Link>
              </li>
              <li>
                <Link
                  href="/inscription"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Créer un compte
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@sank.app"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  contact@sank.app
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Barre légale discrète */}
        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Sank — Abidjan, Côte d'Ivoire</p>
          <p>Fait avec soin, pas avec des mots.</p>
        </div>
      </div>
    </footer>
  );
}
