import { Hero } from "@/components/landing/hero";
import { Piliers } from "@/components/landing/piliers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Accueil du site public. Ambiance claire et aérée : la page respire,
 * le blanc est un matériau, l'accent bleu porte le CTA.
 */
export default function PageAccueil() {
  return (
    <>
      <Hero />
      <Piliers />

      {/* Avant-goût des tarifs : une seule ligne, honnête, pas un tableau */}
      <section className="mx-auto max-w-5xl border-t border-border px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <p className="text-sm text-muted-foreground md:col-span-3">
            Les tarifs
          </p>
          <div className="md:col-span-9">
            <p className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
              Gratuit pour commencer. 10 000 FCFA par mois pour tout faire.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Sans engagement, change de formule quand tu veux. Le détail
              des trois offres est sur la page tarifs.
            </p>
            <div className="mt-8">
              <Button
                render={<Link href="/tarifs" />}
                nativeButton={false}
                variant="outline"
                className="h-11 px-6"
              >
                Voir les tarifs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Appel final : une phrase, une action */}
      <section className="mx-auto max-w-5xl border-t border-border px-6 py-16 md:py-24">
        <h2 className="max-w-2xl font-display text-3xl tracking-tight text-foreground md:text-4xl">
          Essayez Sank ce mois-ci, sur <em className="italic">votre</em> centre.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Créez votre compte, décrivez votre premier modèle, envoyez une
          vraie attestation avant la fin de la journée.
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
