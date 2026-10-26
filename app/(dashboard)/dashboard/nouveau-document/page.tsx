import Link from "next/link";
import { FormulaireNouveauDocument } from "./formulaire";

/* Route bloquante explicite (Next 16 + Cache Components) :
   le layout parent l'est déjà — redondance volontaire, coût nul,
   protection si le layout change un jour. */
export const instant = false;

/**
 * Page dédiée de création de document (choisie plutôt qu'une modale :
 * mobile-friendly, sans-JS-friendly, focus mode).
 * Server Component léger : la logique vit dans la Server Action
 * (actions.ts) et le client n'exprime que le formulaire (formulaire.tsx).
 */
export default function NouveauDocumentPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      {/* retour dashboard */}
      <Link
        href="/dashboard"
        className="mb-6 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Mes documents
      </Link>

      <div className="rounded-lg border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Nouveau document
        </h1>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Décris le document : Sank le rattachera à ton centre.
        </p>

        <FormulaireNouveauDocument />
      </div>
    </div>
  );
}
