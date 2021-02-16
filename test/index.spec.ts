import * as assert from "assert";

describe('Ceci n\'est pas un test', () => {
    it('should return -1 when the value is not present', () => {
        assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
});
