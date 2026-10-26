import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Hero clair et aéré. Règle responsive n°3 : sur mobile tout est
 * empilé (flex-col) et centré ; sur ordinateur, aligné à gauche,
 * avec de grands espaces. Instrument Serif en très grand corps.
 */
export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-16 md:pt-28 md:pb-24">
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        {/* Surtitre : qui, où */}
        <p className="text-sm text-muted-foreground">
          Pour les centres de formation — Côte d'Ivoire
        </p>

        <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Le document que vos étudiants <em className="italic">garderont</em>.
        </h1>

        {/* Le problème et la solution, compris en 10 secondes */}
        <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
          Vous perdez des heures chaque mois à recopier des noms dans Word,
          à refaire la mise en page, puis à envoyer chaque attestation par
          WhatsApp, une par une. Sank garde vos modèles, compose le document
          au nom de votre centre, et l'envoie au numéro de chacun.
        </p>

        {/* CTA principal, cible tactile 44px (h-11) */}
        <div className="mt-10 flex flex-col items-center md:items-start">
          <Button
            render={<Link href="/inscription" />}
            nativeButton={false}
            className="h-11 px-6 text-base"
          >
            Commencer gratuitement
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Plan Découverte à 0 FCFA — aucune carte bancaire requise.
          </p>
        </div>
      </div>
    </section>
  );
}
