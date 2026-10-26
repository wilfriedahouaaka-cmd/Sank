"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SheetClose } from "@/components/ui/sheet";
import { LIENS } from "@/components/landing/liens";

/**
 * Menu mobile : tiroir latéral (Sheet de shadcn/ui), réclamé par la
 * règle responsive n°2. Il remplace l'ancien menu <details> :
 * même destination, composant standard accessible au clavier.
 */
export function MenuMobile() {
  return (
    <Sheet>
      {/* Déclencheur : burger dessiné en 3 filets, cible 44px minimum */}
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Ouvrir le menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted"
          />
        }
      >
        <span className="flex flex-col gap-1.5">
          <span className="block h-px w-5 bg-foreground" />
          <span className="block h-px w-5 bg-foreground" />
          <span className="block h-px w-5 bg-foreground" />
        </span>
      </SheetTrigger>

      {/* Tiroir : à droite, largeur bornée pour ne jamais déborder */}
      <SheetContent side="right" className="p-0">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Menu mobile" className="flex flex-col gap-1 overflow-y-auto p-4">
          {LIENS.map((lien) => (
            <SheetClose
              key={lien.href}
              /* Chaque lien ferme le tiroir, puis navigue */
              render={<Link href={lien.href} />}
              nativeButton={false}
              className="flex min-h-11 items-center rounded-md px-3 py-3 text-sm text-foreground transition-colors hover:bg-muted"
            >
              {lien.label}
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-border p-4">
          <SheetClose
            render={<Link href="/connexion" />}
            nativeButton={false}
            className="flex min-h-11 items-center rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            Se connecter
          </SheetClose>
          <SheetClose
            render={<Link href="/inscription" />}
            nativeButton={false}
            className="flex min-h-11 items-center rounded-md px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted"
          >
            Commencer gratuitement
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
