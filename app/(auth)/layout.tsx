/**
 * Coquille des pages d'authentification (/connexion, /inscription).
 * Zone publique, independante du dashboard : contenu centre,
 * verticalement et horizontalement, sur fond sombre.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      {children}
    </main>
  );
}
