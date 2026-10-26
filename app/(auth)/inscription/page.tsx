"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { traduireErreurAuth } from "@/lib/erreurs-auth";
import { creerCentreDepuisInscription } from "@/app/(dashboard)/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Page d'inscription des directeurs de centres.
 * Apres succes, Better Auth ouvre une session : redirection dashboard.
 * La validation definitive (email unique, longueur mot de passe, ...)
 * est faite cote serveur par Better Auth — le front ne fait que guider.
 */
export default function InscriptionPage() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [nomCentre, setNomCentre] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErreur(null);

    let leMdpEstShort = motDePasse.length < 8; // remonter la contrainte serveur (min 8)
    if (leMdpEstShort) {
      setErreur("Le mot de passe doit contenir au moins 8 caracteres.");
      return;
    }

    setChargement(true);
    try {
      const { error } = await authClient.signUp.email({
        name: nom,
        email,
        password: motDePasse,
      });
      if (error) {
        setErreur(traduireErreurAuth(error.message));
        return;
      }

      // Le compte existe et la session est ouverte : on crée le centre
      // tout de suite (Server Action). Si ça échoue, pas de blocage :
      // le dashboard propose une carte de récupération.
      const resultatCentre = await creerCentreDepuisInscription(nomCentre);
      if (resultatCentre.erreur) {
        setErreur(resultatCentre.erreur);
        return;
      }

      router.push("/dashboard");
    } catch {
      setErreur("Inscription impossible. Verifie ta connexion internet et reessaie.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6">
      <Link
        href="/"
        className="mb-6 flex items-center justify-center gap-2 text-lg font-semibold tracking-tight text-foreground"
      >
        Sank
        <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
      </Link>

      <h1 className="text-center text-2xl font-semibold tracking-tight">Creer un compte</h1>
      <p className="mt-1 mb-6 text-center text-sm text-muted-foreground">
        Pour les directeurs de centres de formation.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor="nom">Nom du directeur</Label>
          <Input
            id="nom"
            type="text"
            required
            autoComplete="name"
            placeholder="Wilfried Ahoua"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            disabled={chargement}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="nomCentre">Nom du centre de formation</Label>
          <Input
            id="nomCentre"
            type="text"
            required
            placeholder="Centre de formation Yopougon"
            value={nomCentre}
            onChange={(e) => setNomCentre(e.target.value)}
            disabled={chargement}
          />
        </div>

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
            minLength={8} // aligne avec minPasswordLength cote serveur
            autoComplete="new-password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            disabled={chargement}
          />
          <p className="text-xs text-muted-foreground/60">8 caracteres minimum.</p>
        </div>

        {erreur && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {erreur}
          </p>
        )}

        <Button type="submit" disabled={chargement} className="h-10">
          {chargement ? "Creation..." : "Creer mon compte"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Deja un compte ?{" "}
        <Link href="/connexion" className="text-foreground underline underline-offset-4">
          Connexion
        </Link>
      </p>
    </div>
  );
}
