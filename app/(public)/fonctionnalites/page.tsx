import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sank — Fonctionnalités",
  description:
    "Modèles réutilisables, génération en 2 clics, design soigné, envoi WhatsApp : ce que fait Sank pour les centres de formation.",
};

/* Les 6 capacités de Sank, dans l'ordre du parcours du directeur */
const FONCTIONNALITES = [
  {
    numero: "01",
    titre: "Modèles réutilisables",
    texte:
      "Décrivez le document une fois : en-tête du centre, mention, signature. Après, chaque attestation se crée à partir de ce modèle.",
  },
  {
    numero: "02",
    titre: "Génération en 2 clics",
    texte:
      "Vous choisissez le modèle, vous entrez le nom de l'étudiant et le diplôme. Sank compose le document, à la bonne forme, sans faute de mise en page.",
  },
  {
    numero: "03",
    titre: "Design soigné",
    texte:
      "Typographie propre, alignements exacts, nom du centre bien posé. Un document dont vos étudiants seront fiers sur leur CV.",
  },
  {
    numero: "04",
    titre: "Envoi WhatsApp",
    texte:
      "Le document part au numéro de l'étudiant, prêt à être reçu et partagé. Fini l'envoi à la main, photo par photo.",
  },
  {
    numero: "05",
    titre: "Web, rien à installer",
    texte:
      "Sank tourne dans le navigateur, sur le téléphone de bureau comme sur le portable. Pas de logiciel, pas de mise à jour.",
  },
  {
    numero: "06",
    titre: "Un espace par centre",
    texte:
      "Votre espace est à votre nom : vos modèles, vos documents, vos étudiants. Rien n'est partagé entre centres.",
  },
] as const;

export default function PageFonctionnalites() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-16 md:pt-24 md:pb-24">
        <p className="text-sm text-muted-foreground">Fonctionnalités</p>
        <h1 className="mt-8 max-w-2xl font-display text-4xl leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Ce que <em className="italic">fait</em> Sank, au quotidien.
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
          Six choses, pas soixante. Tout ce qui est ici sert le même but :
          vous faire gagner les heures que vous perdez à produire et envoyer
          vos attestations.
        </p>
      </section>

      <section className="mx-auto max-w-5xl border-t border-border px-6 pb-16 md:pb-24">
        {/* Grille responsive (règle 4) : 1 colonne mobile, 2 md:, 3 lg: */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {FONCTIONNALITES.map((item) => (
            <article
              key={item.numero}
              className="flex flex-col rounded-lg border border-border bg-card p-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-lg italic text-muted-foreground"
              >
                {item.numero}
              </span>
              <h2 className="mt-6 font-display text-2xl tracking-tight text-foreground">
                {item.titre}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                {item.texte}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl border-t border-border px-6 py-16 md:py-24">
        <h2 className="max-w-2xl font-display text-3xl tracking-tight text-foreground md:text-4xl">
          La meilleure preuve, c'est la vôtre.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
          Créez votre compte gratuitement et générez votre première
          attestation aujourd'hui.
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
