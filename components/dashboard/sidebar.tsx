"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Navigation latérale du dashboard.
 * Composant client ("use client") : il a besoin de `usePathname`
 * pour connaître la page active. Ce hook ne fonctionne qu'au sein du client.
 */

// Éléments de navigation — "bientot" = page pas encore créée :
// on l'affiche grise et non cliquable (honnête, et pas de lien 404).
interface NavItem {
  label: string;
  href: string;
  bientot?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Tableau de bord", href: "/dashboard" },
  { label: "Documents", href: "/dashboard/documents", bientot: true },
  { label: "Paramètres", href: "/dashboard/parametres", bientot: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border md:flex">
      {/* Logo de marque — retourne au tableau de bord */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-6 py-5 text-lg font-semibold tracking-tight text-foreground"
      >
        Sank
        {/* Point d'accent bleu #2563EB, seul usage discret de la couleur */}
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
      </Link>

      {/* Liens de navigation, espacement 4px (gap-1 = 4px) */}
      <nav aria-label="Navigation du tableau de bord" className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) =>
          item.bientot ? (
            <span
              key={item.label}
              title="Bientôt disponible"
              className="cursor-default rounded-lg px-3 py-2 text-sm text-muted-foreground/50"
            >
              {item.label}
            </span>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-secondary text-foreground" // Lien actif : surface #1a1a1a
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </aside>
  );
}
