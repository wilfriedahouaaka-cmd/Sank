"use client";

import { useActionState } from "react";
import {
  ETAT_INITIAL_CREATION,
  actionCreerDocument,
  type EtatCreation,
} from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Formulaire de création de document (client) — la Server Action
 * `actionCreerDocument` fait le travail réel : validation Zod côté
 * serveur, insertion Drizzle au centre du directeur connecté,
 * puis redirection vers le dashboard rafraîchi. Réussite = aucune
 * donnée d'état ici : redirect() remplace la page.
 */
export function FormulaireNouveauDocument() {
  const [etat, formAction, enCours] = useActionState<EtatCreation, FormData>(
    actionCreerDocument,
    ETAT_INITIAL_CREATION,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="nomEtudiant">Nom de l'étudiant</Label>
        <Input
          id="nomEtudiant"
          name="nomEtudiant"
          type="text"
          required
          autoComplete="off"
          placeholder="Awa Koné"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cours">Cours</Label>
        <Input
          id="cours"
          name="cours"
          type="text"
          required
          autoComplete="off"
          placeholder="Bureautique"
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
        {enCours ? "Création..." : "Créer le document"}
      </Button>
    </form>
  );
}
