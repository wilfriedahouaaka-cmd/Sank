/**
 * Les 3 piliers en cartes sobres (filet, pas d'ombre criarde).
 * Grille responsive (règle n°4) : 1 colonne sur mobile,
 * 2 sur tablette (md:), 3 sur ordinateur (lg:).
 */
const PILIERS = [
  {
    numero: "01",
    titre: "Gain de temps",
    texte:
      "Le modèle existe une fois dans Sank. Créer l'attestation d'un étudiant devient un mini-formulaire de deux champs — pas une heure de copier-coller.",
  },
  {
    numero: "02",
    titre: "Qualité",
    texte:
      "Une mise en page soignée, à l'effigie de votre centre : en-tête, typographie, cachet. Un document que l'étudiant affichera sur son CV.",
  },
  {
    numero: "03",
    titre: "WhatsApp",
    texte:
      "Le document part au numéro WhatsApp de l'étudiant, prêt à envoyer. Pas d'email perdu, pas de papier oublié sur un bureau.",
  },
] as const;

export function Piliers() {
  return (
    <section className="mx-auto max-w-5xl border-t border-border px-6 py-16 md:py-24">
      <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
        Pourquoi Sank
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {PILIERS.map((pilier) => (
          <article
            key={pilier.numero}
            className="flex flex-col rounded-lg border border-border bg-card p-6 md:p-8"
          >
            {/* Numéro serif en retrait de couleur : discret, éditorial */}
            <span
              aria-hidden="true"
              className="font-display text-lg italic text-muted-foreground"
            >
              {pilier.numero}
            </span>

            <h3 className="mt-6 font-display text-2xl tracking-tight text-foreground">
              {pilier.titre}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
              {pilier.texte}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
