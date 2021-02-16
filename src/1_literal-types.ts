import { v4 as uuidv4 } from 'uuid';
import { emptyArray } from './utils/array';
import { random, RandomFunc } from './utils/random';

/**
 * Ref :
 * https://www.typescriptlang.org/docs/handbook/literal-types.html
 * Wiki du Jeu de carte :
 * https://fr.wikipedia.org/wiki/Jeu_de_cartes_fran%C3%A7ais
 */





export enum _Enseigne {
    Piques,
    Carreaux,
    Cœurs,
    Trèfles
}

export interface _Carte {
    id: string; // format de l'id
    enseigne: _Enseigne; // Enseigne de la carte
    valeur: number; // 1 - 13, le un représent-il l'as ?
}

const _carte: _Carte = { id: 'blabla', enseigne: _Enseigne.Piques, valeur: 1 };
// console.log(_carte);










/**
 * Un type littéral est un sous-type plus concret d'un type collectif.
 * Cela signifie que "string" est une chaîne, mais qu'une chaîne n'est pas "string" dans le système de types.
 * 
 * Literal Types == ubiquitous language
 */

export type CarteId = string;
export type Honneur = 'As' | 'Roi' | 'Dame' | 'Valet';
export type Point = 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2;
export type Valeur = Honneur | Point;
export type Enseigne = 'Piques' | 'Carreaux' | 'Cœurs' | 'Trèfles';

export interface Carte {
    id: CarteId;
    enseigne: Enseigne;
    valeur: Valeur;
}

export const createRandomCard = (): Carte => {
    return {
        id: uuidv4(),
        enseigne: couleurAléatoire(random),
        valeur: valeurAléatoire(random)
    }
}

export const couleurAléatoire = (random: RandomFunc): Enseigne => {
    const n = random(4);
    switch (n) {
        case 1: return 'Piques';
        case 2: return 'Carreaux';
        case 3: return 'Cœurs';
        case 4: return 'Trèfles';
        default: throw new Error(`Couleur impossible à générer avec cette valeur : ${n}`);
    }
}

export const valeurAléatoire = (random: RandomFunc): Valeur => {
    const n = random(13);
    if (n >= 2 && n <= 10) {
        return n as Point;
    }
    switch (n) {
        case 1: return 'As';
        case 11: return 'Valet';
        case 12: return 'Dame';
        case 13: return 'Roi';
    }
    throw new Error(`Valeur impossible à générer avec cette valeur : ${n}`);
}

// console.log(emptyArray(5).map(createRandomCard));

// Exemple

interface Facture { }

type FactureValidé = Readonly<Facture>;

declare function ajoutéUnArticle(facture: Facture): Facture;
declare function ajoutéUnArticle(facture: FactureValidé): Facture;