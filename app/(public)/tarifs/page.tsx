import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sank — Tarifs",
  description:
    "Découverte 0 FCFA, Standard 10 000 FCFA/mois, Pro 25 000 FCFA/mois. Sans engagement, changez de formule quand vous voulez.",
};

/* Les 3 offres V1 : aucun paiement branché, chaque CTA mène à l'inscription */
const OFFRES = [
  {
    nom: "Découverte",
    prix: "0\u00A0FCFA",
    inclus: ["10 attestations par mois", "Envoi WhatsApp"],
    recommande: false,
  },
  {
    nom: "Standard",
    prix: "10\u00A0000\u00A0FCFA",
    inclus: ["Attestations illimitées", "Envoi WhatsApp illimité"],
    recommande: true,
  },
  {
    nom: "Pro",
    prix: "25\u00A0000\u00A0FCFA",
    inclus: [
      "Tout du Standard",
      "Logo du centre sur l'attestation",
      "Support prioritaire",
    ],
    recommande: false,
  },
] as const;

export default function PageTarifs() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-16 md:pt-24 md:pb-24">
        <p className="text-sm text-muted-foreground">Tarifs</p>
        <h1 className="mt-8 max-w-2xl font-display text-4xl leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Un prix par centre et par mois.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
          Trois formules, affichées clairement. Sans engagement : changez
          quand vous voulez, ou arrêtez. Le paiement se mettra en place avec
          les moyens utilisés ici ; pour l'instant, l'inscription Découverte
          est gratuite.
        </p>
      </section>

      {/* Cartes offres — grille responsive (règle 4) : 1 / 2 / 3 colonnes */}
      <section className="mx-auto max-w-5xl border-t border-border px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {OFFRES.map((offre) => (
            <article
              key={offre.nom}
              /* L'offre recommandée est soulignée d'un filet bleu,
                 pas d'une ombre criarde */
              className={
                offre.recommande
                  ? "flex flex-col rounded-lg border border-primary/40 bg-card p-6 md:p-8"
                  : "flex flex-col rounded-lg border border-border bg-card p-6 md:p-8"
              }
            >
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-medium text-foreground">
                  {offre.nom}
                </h2>
                {offre.recommande && (
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    Recommandé
                  </span>
                )}
              </div>

              {/* Prix en serif, bien grand */}
              <p className="mt-6 font-display text-3xl tracking-tight text-foreground">
                {offre.prix}
                {offre.nom !== "Découverte" && (
                  <span className="text-base text-muted-foreground">
                    {" "}
                    / mois
                  </span>
                )}
              </p>

              <ul className="mt-4 flex flex-col gap-2 text-sm leading-6 text-muted-foreground">
                {offre.inclus.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              {/* CTA pleine largeur, 44px de haut (règle 5) */}
              <div className="mt-8 flex-1" aria-hidden="true" />
              <Button
                render={<Link href="/inscription" />}
                nativeButton={false}
                variant={offre.recommande ? "default" : "outline"}
                className="mt-8 h-11 w-full"
              >
                Commencer
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl border-t border-border px-6 py-16 md:py-24">
        <h2 className="max-w-2xl font-display text-3xl tracking-tight text-foreground md:text-4xl">
          La question du mois, réglée.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Une attestation prise à part, c'est une demi-journée. Un mois de
          Standard coûte moins que ce temps perdu.
        </p>
        <div className="mt-8">
          <Button
            render={<Link href="/inscription" />}
            nativeButton={false}
            className="h-11 px-6 text-base"
          >
            Commencer gratuitement
          </Button>
        </div>
      </section>
    </>
  );
}
