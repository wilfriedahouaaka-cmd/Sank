import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { centres, documents } from "@/db/schema";
import { db } from "@/db";
import { obtenirSession } from "@/lib/session";
import { CarteCreationCentre } from "./creation-centre";

/* Lectures de session + base par requête : route bloquante explicite
   (Next 16 + Cache Components, équivalent de l'ancien force-dynamic). */
export const instant = false;

/* Badges de statut — palette translucide (fond 10%, texte teinte doux) */
function stylesStatut(statut: string): string {
  switch (statut) {
    case "Envoyé":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
    case "En attente":
      return "border-amber-500/20 bg-amber-500/10 text-amber-400";
    default:
      // Statut inconnu : pale mute, jamais une teinte qui ne ment pas
      return "border-border bg-secondary text-muted-foreground";
  }
}

const formatJour = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
});

/**
 * Page "Mes documents" — Server Component asynchrone : les données
 * viennent de la base via Drizzle, rattachées au centre du directeur
 * connecté. Les mock data ont eté supprimes — cette page n'affiche
 * que ce qui existe réellement en base.
 */
export default async function DashboardPage() {
  const session = await obtenirSession();

  // Double filet de sécurité (le layout garantit déjà la session) —
  // si un jour le layout change, la page reste protégée.
  if (!session) {
    redirect("/connexion");
  }

  const centre = await db.query.centres.findFirst({
    where: eq(centres.userId, session.user.id),
  });

  // Cas 1 : pas de centre -> carte de rattrapage
  if (!centre) {
    return <CarteCreationCentre />;
  }

  const listeDocuments = await db.query.documents.findMany({
    where: eq(documents.centreId, centre.id),
    orderBy: [desc(documents.createdAt)], // les plus récents en premier
  });

  return (
    <>
      {/* En-tête de page : titre gauche, action principale droite. */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Mes documents</h1>

        {/* render : le <Link> porte le design du Button, HTML valide + a11y */}
        <Button
          render={<Link href="/dashboard/nouveau-document" />}
          nativeButton={false}
          className="px-3"
        >
          Créer un document
        </Button>
      </header>

      {/* Cas 2 : centre existant, zéro document -> état vide encourageant */}
      {listeDocuments.length === 0 ? (
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border py-20 text-center">
          <p className="font-medium text-foreground">
            Aucun document pour le moment
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Crée ton premier document : l'étudiant recevra son PDF par
            WhatsApp quand le flux sera branché.
          </p>
          <Button
            render={<Link href="/dashboard/nouveau-document" />}
            nativeButton={false}
            className="px-3"
          >
            Créer un document
          </Button>
        </section>
      ) : (
        /* Cas 3 : documents réels — grille 1/2/3 colonnes selon l'écran */
        <section
          aria-label="Documents récents"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {listeDocuments.map((doc) => (
            <article
              key={doc.id}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {doc.nomEtudiant}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {doc.cours}
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${stylesStatut(doc.statut)}`}
                >
                  <span
                    className="size-1.5 rounded-full bg-current"
                    aria-hidden="true"
                  />
                  {doc.statut}
                </span>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Créé le {formatJour.format(doc.createdAt)}
              </p>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
