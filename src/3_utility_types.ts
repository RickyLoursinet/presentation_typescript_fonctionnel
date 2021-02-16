/**
 * Ref :
 * https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
 */

type _Partial<T> = {
    [P in keyof T]?: T[P];
};

type _Readonly<T> = {
    readonly [P in keyof T]: T[P];
};