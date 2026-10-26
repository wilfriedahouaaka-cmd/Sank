"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { traduireErreurAuth } from "@/lib/erreurs-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Page de connexion des directeurs de centres.
 * Client ("use client") : transport reel des donnees via Better Auth,
 * avec etat d'envoi et message d'erreur affiche sous les champs.
 */
export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // pas de POST HTML natif : tout passe par Better Auth
    setErreur(null);
    setChargement(true);
    try {
      const { error } = await authClient.signIn.email({ email, password: motDePasse });
      if (error) {
        // Erreur metier : identifiants faux, compte inexistant...
        setErreur(traduireErreurAuth(error.message));
        return;
      }
      // Session creee : le dashboard est deja accessible
      router.push("/dashboard");
    } catch {
      // Erreur reseau (hors ligne, serveur down)
      setErreur("Connexion impossible. Verifie ta connexion internet et reessaie.");
    } finally {
      setChargement(false);
    }
  }

  return (
    // Carte du formulaire : surface #111113 + bordure subtile, coins 8px
    <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6">
      {/* Retour a la landing — aussi la marques du produit */}
      <Link
        href="/"
        className="mb-6 flex items-center justify-center gap-2 text-lg font-semibold tracking-tight text-foreground"
      >
        Sank
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
      </Link>

      <h1 className="text-center text-2xl font-semibold tracking-tight">Se connecter</h1>
      <p className="mt-1 mb-6 text-center text-sm text-muted-foreground">
        Espace directeur de centre de formation.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@centre.ci"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={chargement}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="mot-de-passe">Mot de passe</Label>
          <Input
            id="mot-de-passe"
            type="password"
            required
            autoComplete="current-password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            disabled={chargement}
          />
        </div>

        {/* Message d'erreur : role alert pour que le lecteur d'ecran l'annonce */}
        {erreur && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {erreur}
          </p>
        )}

        <Button type="submit" disabled={chargement} className="h-10">
          {chargement ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="text-foreground underline underline-offset-4">
          Inscription
        </Link>
      </p>
    </div>
  );
}
