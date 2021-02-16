import { sequenceT } from 'fp-ts/lib/Apply';
import { Either, either, getOrElse, left, map, right } from 'fp-ts/lib/Either';
import { IO, of as ofIO } from 'fp-ts/lib/IO';
import { IOEither, ioEither, right as rightIO, left as leftIO, map as mapIO } from 'fp-ts/lib/IOEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { v4 as uuidv4 } from 'uuid';
import { RandomFunc, RandomFuncSafe, random, randomSafe, bugRandom, bugRandomSafe } from './utils/random';


// https://gcanti.github.io/fp-ts/modules/Either.ts.html


type CarteId = string;
type Honneur = 'As' | 'Roi' | 'Dame' | 'Valet';
type Point = 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2;
type Valeur = Honneur | Point;
type Enseigne = 'Piques' | 'Carreaux' | 'Cœurs' | 'Trèfles';

interface Carte {
    id: CarteId;
    enseigne: Enseigne;
    valeur: Valeur;
}

const couleurAléatoire = (random: RandomFunc): Enseigne => {
    const n = random(4);
    switch (n) {
        case 1: return 'Piques';
        case 2: return 'Carreaux';
        case 3: return 'Cœurs';
        case 4: return 'Trèfles';
        default: throw new Error(`Couleur impossible à générer avec cette valeur : ${n}`);
    }
}

const valeurAléatoire = (random: RandomFunc): Valeur => {
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

const createRandomCard = (): Carte => {
    return {
        id: uuidv4(),
        enseigne: couleurAléatoire(bugRandom),
        valeur: valeurAléatoire(bugRandom)
    }
}

// console.log(createRandomCard());





















const couleurAléatoireWithEither = (random: RandomFunc): Either<Error, Enseigne> => {
    const n = random(4);
    switch (n) {
        case 1: return right('Piques');
        case 2: return right('Carreaux');
        case 3: return right('Cœurs');
        case 4: return right('Trèfles');
        default: return left(new Error(`Couleur impossible à générer avec cette valeur : ${n}`));
    }
}

const valeurAléatoireWithEither = (random: RandomFunc): Either<Error, Valeur> => {
    const n = random(13);
    if (n >= 2 && n <= 10) {
        return right(n as Point);
    }
    switch (n) {
        case 1: return right('As');
        case 11: return right('Valet');
        case 12: return right('Dame');
        case 13: return right('Roi');
    }
    return left(new Error(`Valeur impossible à générer avec cette valeur : ${n}`));
}

// const createRandomCardWithEither = (): Carte => {
//     return {
//         id: uuidv4(),
//         enseigne: couleurAléatoireWithEither(bugRandom),
//         valeur: valeurAléatoireWithEither(bugRandom)
//     }
// }

const enseigneParDéfaut = (): Enseigne => 'Piques';
const valeurParDéfaut = (): Valeur => 2;

const createRandomCardWithEither = (): Carte => ({
    id: uuidv4(),
    enseigne: getOrElse(enseigneParDéfaut)(couleurAléatoireWithEither(bugRandom)),
    valeur: getOrElse(valeurParDéfaut)(valeurAléatoireWithEither(bugRandom)),
}); // 🤤





















const sequenceTEither = sequenceT(either);

const toCarte = ([uuid, enseigne, valeur]: [string, Enseigne, Valeur]): Carte => ({ id: uuid, enseigne, valeur });

const createRandomCardWithSelfEither = (fn: RandomFunc): Either<Error, Carte> => pipe(
    sequenceTEither(
        right<Error, string>(uuidv4()),
        couleurAléatoireWithEither(fn),
        valeurAléatoireWithEither(fn)
    ),
    map(toCarte)
); // 🥰

// console.log(createRandomCardWithSelfEither(bugRandom));














/**
 * https://fr.wikipedia.org/wiki/Fonction_pure
 * https://fr.wikipedia.org/wiki/Transparence_r%C3%A9f%C3%A9rentielle
 */














const couleurAléatoireWithIOEither = (random: RandomFuncSafe): IOEither<Error, Enseigne> => {
    const n = random(4)();
    switch (n) {
        case 1: return rightIO('Piques');
        case 2: return rightIO('Carreaux');
        case 3: return rightIO('Cœurs');
        case 4: return rightIO('Trèfles');
        default: return leftIO(new Error(`Couleur impossible à générer avec cette valeur : ${n}`));
    }
}

const valeurAléatoireWithIOEither = (random: RandomFuncSafe): IOEither<Error, Valeur> => {
    const n = random(13)();
    if (n >= 2 && n <= 10) {
        return rightIO(n as Point);
    }
    switch (n) {
        case 1: return rightIO('As');
        case 11: return rightIO('Valet');
        case 12: return rightIO('Dame');
        case 13: return rightIO('Roi');
    }
    return leftIO(new Error(`Valeur impossible à générer avec cette valeur : ${n}`));
}

const randomUuidv4 = (): IO<string> => ofIO(uuidv4());

const sequenceTIOEither = sequenceT(ioEither);

const createRandomCardWithSelfIOEither = (fn: RandomFuncSafe): IOEither<Error, Carte> => pipe(
    sequenceTIOEither(
        rightIO<Error, string>(randomUuidv4()()),
        couleurAléatoireWithIOEither(fn),
        valeurAléatoireWithIOEither(fn)
    ),
    mapIO(toCarte)
); // 🤯

// console.log(createRandomCardWithSelfIOEither(random));
