import * as assert from "assert";
import { createRandomCard } from "../src/1_literal-types";

describe('1 - Test de la génération des cartes', () => {
    it('Générer deux cartes différentes', () => {
        assert.notStrictEqual(createRandomCard(), createRandomCard());
    });
});
