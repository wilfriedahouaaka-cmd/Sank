import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuMobile } from "@/components/landing/menu-mobile";
import { LIENS } from "@/components/landing/liens";

/**
 * Barre de navigation fixe (sticky) du site public, thème clair.
 * Ecran large : liens au centre, actions à droite.
 * Mobile : tous les liens cèdent la place au hamburger (Sheet) —
 * règle responsive : rien ne doit dépasser de l'écran.
 */
export function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo : serif, le point bleu fait signe vers l'accent */}
        <Link
          href="/"
          className="font-display text-xl text-foreground"
        >
          Sank<span className="text-primary">.</span>
        </Link>

        {/* Liens centraux — écran large uniquement */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex md:items-center md:gap-8"
        >
          {LIENS.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {lien.label}
            </Link>
          ))}
        </nav>

        {/* Actions — écran large uniquement. h-11 = 44px : tactile (règle 5) */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <Button
            render={<Link href="/connexion" />}
            nativeButton={false}
            variant="ghost"
            className="h-11 px-4"
          >
            Se connecter
          </Button>
          <Button
            render={<Link href="/inscription" />}
            nativeButton={false}
            className="h-11 px-5"
          >
            Commencer
          </Button>
        </div>

        {/* Hamburger mobile (tiroir Sheet) */}
        <div className="md:hidden">
          <MenuMobile />
        </div>
      </div>
    </header>
  );
}
