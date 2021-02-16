import * as assert from "assert";
import { add, add3AndMultiplyBy4, add3AndMultiplyBy4Curried, addCurried } from "../src/6_curry";

describe('5 - Test de la currification de function', () => {
    it('add === curriedAdd', () => {
        assert.strictEqual(add(3, 3), addCurried(3)(3));
    });
    it('partial curriedAdd', () => {
        const add3 = addCurried(3);
        assert.strictEqual(6, add3(3));
    });
    it('add3AndMultiplyBy4 === add3AndMultiplyBy4Curried', () => {
        assert.strictEqual(add3AndMultiplyBy4Curried(3), add3AndMultiplyBy4(3));
    });
});
