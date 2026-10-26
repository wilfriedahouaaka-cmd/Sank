import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { centres } from "@/db/schema";
import { db } from "@/db";
import { obtenirSession } from "@/lib/session";

/* Route bloquante (Next 16 + Cache Components) : lecture de la session
   par requête — jamais de pré-rendu statique ici, sinon Next mettrait
   en cache une page qui dépend de l'utilisateur connecté.
   (Successeur de `dynamic = "force-dynamic"`, interdit avec cacheComponents.) */
export const instant = false;

/**
 * Armature du dashboard.
 *
 * SECURITE : zone 100% privée. Pas de session -> redirection /connexion
 * (l'interception ici protège TOUTES les futures pages imbriquées ;
 * inutile de répéter le check page par page).
 *
 * Le nom du centre vient de la base. Si le directeur n'en a pas encore
 * creaé, la topbar affiche un placeholder et le contenu proposera la
 * création du centre.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await obtenirSession();

  // Aucune session valide : le dashboard est inaccessible
  if (!session) {
    redirect("/connexion");
  }

  // V1 : 1 directeur = 1 centre (contrainte par la base)
  const centre = await db.query.centres.findFirst({
    where: eq(centres.userId, session.user.id),
  });

  return (
    <div className="flex h-dvh overflow-hidden bg-[#0a0a0a]">
      <Sidebar />

      {/* min-w-0 bloque simplement le débordement du contenu central */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar centre={centre?.nom ?? "Ton centre de formation"} />
        <main className="flex-1 overflow-y-auto px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
