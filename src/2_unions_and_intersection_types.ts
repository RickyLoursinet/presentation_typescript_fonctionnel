/**
 * Ref :
 * https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
 */

/**
 * UNO
 */

import { Carte } from "./1_literal-types";

type PiocheCartes = (joueur: any, nbDeCartes: number) => Carte[];

interface CartePlus2 {
    libelle: string;
    pioche: PiocheCartes;
}

interface CarteInversion {
    libelle: string;
}

type CartesDisponibles =
    | CartePlus2
    | CarteInversion;

const jouerUneCarte = (carte: CartesDisponibles) => {
    // console.log(carte.pioche);
    // Throw exception
    // carte.pioche()
    if (isCartePlus2(carte)) {
        carte.pioche(4, 2);
    }
}

jouerUneCarte({ libelle: "+2", pioche: (joueur: any, nbDeCartes: number) => [] })

const isCartePlus2 = (carte: CartesDisponibles): carte is CartePlus2 => carte.libelle === '+2';

const jouerUneCarte2 = (carte: CartesDisponibles) => isCartePlus2(carte) ? carte.pioche(4, 2) : console.log('🔄');











interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}

interface ArtworksData {
    artworks: { title: string }[];
}

interface ArtistsData {
    artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.<

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
    if (response.error) {
        console.error(response.error.message);
        return;
    }
    console.log(response.artists);
};

// Real World Exemple

export interface Person {
    name: string;
    age: number;
}

export interface JSONSerializable {
    toJSON(): string;
}

export type PersonJSON = Person & JSONSerializable;
