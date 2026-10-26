"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

/**
 * Déconnexion : invalide la session côté serveur via Better Auth,
 * puis redirection vers /connexion. `replace` (et non push) : le
 * bouton "retour" du navigateur ne doit pas ramener au dashboard privé.
 */
export function BoutonDeconnexion() {
  const router = useRouter();
  const [chargement, setChargement] = useState(false);

  async function seDeconnecter() {
    setChargement(true);
    try {
      await authClient.signOut();
      router.replace("/connexion");
    } catch {
      // Meme si l'appel echoue, blocage bas : force la redirection,
      // la session restante est re-verifiable plus tard.
      router.replace("/connexion");
    } finally {
      setChargement(false);
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={seDeconnecter} disabled={chargement}>
      {chargement ? "Déconnexion..." : "Déconnexion"}
    </Button>
  );
}
