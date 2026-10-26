import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sank — Contact",
  description:
    "Écrivez à l'équipe Sank : contact@sank.app. Basés à Abidjan, réponse sous 24 h ouvrées.",
};

export default function PageContact() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-24 md:pt-24">
      <p className="text-sm text-muted-foreground">Contact</p>
      <h1 className="mt-8 max-w-2xl font-display text-4xl leading-[1.08] tracking-tight text-foreground md:text-6xl">
        Écrivez-nous, c'est un humain qui répond.
      </h1>

      {/* Coordonnées posées en liste calme, pas un formulaire administratif */}
      <dl className="mt-16 max-w-2xl border-t border-border">
        <div className="grid grid-cols-1 gap-2 border-t border-border py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-10">
          <dt className="text-sm text-muted-foreground">Email</dt>
          <dd>
            <a
              href="mailto:contact@sank.app"
              className="font-display text-2xl text-foreground transition-colors hover:text-primary sm:text-3xl"
            >
              contact@sank.app
            </a>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Une question sur les tarifs, un souci technique, une idée ?
              Écrivez.
            </p>
            {/* Hypothèse posée en équipe (pas visible des visiteurs) :
                viser une réponse sous 24 h ouvrées. */}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-2 border-t border-border py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-10">
          <dt className="text-sm text-muted-foreground">Lieu</dt>
          <dd className="text-base text-foreground">
            Abidjan, Côte d'Ivoire
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-2 border-t border-border py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-10">
          <dt className="text-sm text-muted-foreground">Disponibilité</dt>
          {/* Hypothèse posée de façon raisonnable : à valider ensemble */}
          <dd className="text-base text-foreground">
            Du lundi au samedi, 8 h – 18 h (hypothèse à valider)
          </dd>
        </div>
      </dl>
    </section>
  );
}
