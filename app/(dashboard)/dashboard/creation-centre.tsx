"use client";

import { useActionState } from "react";
import {
  ETAT_INITIAL_CREATION,
  actionCreerCentre,
  type EtatCreation,
} from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Carte affichée quand le directeur connecté n'a pas encore de centre
 * (compte de test, panne réseau pendant l'inscription...).
 * Rattrapage volontaire : jamais de blocage sans issue.
 */
export function CarteCreationCentre() {
  // React 19 : useActionState renvoie [etat, action, isPending(booléen)]
  const [etat, formAction, enCours] = useActionState<EtatCreation, FormData>(
    actionCreerCentre,
    ETAT_INITIAL_CREATION,
  );

  return (
    // Carte centrée verticalement dans l'espace disponible
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6">
        <h1 className="text-center text-2xl font-semibold tracking-tight">
          Crée ton centre
        </h1>
        <p className="mt-1 mb-6 text-center text-sm text-muted-foreground">
          Une dernière pièce du puzzle : les documents seront tous rattachés
          à ton centre de formation.
        </p>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="nom">Nom du centre de formation</Label>
            <Input
              id="nom"
              name="nom" // requis : c'est sur ce champ que le FormData est lu
              type="text"
              required
              placeholder="Centre de formation Yopougon"
            />
          </div>

          {etat.erreur && (
            <p
              role="alert"
              className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {etat.erreur}
            </p>
          )}

          <Button type="submit" disabled={enCours} className="h-10">
            {enCours ? "Création..." : "Créer mon centre"}
          </Button>
        </form>
      </div>
    </div>
  );
}
