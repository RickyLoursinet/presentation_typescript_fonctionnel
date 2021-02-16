import { sequenceT } from "fp-ts/lib/Apply";
import { Either, fromOption } from "fp-ts/lib/Either";
import { fromNullableK, getOrElse, map, none, option, Option, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { tupled } from "fp-ts/lib/function";
const sequenceTOption = sequenceT(option);




export const toNumber = (s: string): number | null => {
    const n = parseFloat(s)
    return isNaN(n) ? null : n
}
// console.log(toNumber('4.5'))
// console.log(toNumber('coucou'))
















const toNumberSafe = fromNullableK(toNumber);
// console.log(toNumberSafe('4.5'))
// console.log(toNumberSafe('coucou'))
















export const toNumberOption = (s: string): Option<number> => {
    const n = parseFloat(s)
    return isNaN(n) ? none : some(n)
}

// const f = (x: string) => (y: string): number => {
//     const a = toNumberSafe(x);
//     const b = toNumberSafe(y);
//     return a + b;
// } // 😐

// const f = (x: string) => (y: string): number => {
//     const a = getOrElse(() => 0)(toNumberSafe(x));
//     const b = getOrElse(() => 0)(toNumberSafe(y));
//     return a + b;
// } // 🤤
// console.log('f to number');
// console.log(f('ss')('4'));

// const f = (x: string) => (y: string): Option<number> => pipe(sequenceTOption(
//     toNumberSafe(x),
//     toNumberSafe(y)
// ),
//     map(([x, y]: [number, number]) => x + y)
// ); // 🥰
// console.log('f to Option<number>');
// console.log(f('ss')('4'));

// const f = (x: string) => (y: string): Either<string, number> => pipe(sequenceTOption(
//     toNumberSafe(x),
//     toNumberSafe(y)
// ),
//     map(([x, y]: [number, number]) => x + y),
//     fromOption(() => 'Le format n\'est pas bon')
// ); // 🤗🤩
// console.log('f to Either<string, number>');
// console.log(f('ss')('4'));





















interface Person {
    age: number;
    name: string | null;
}

const formatStringToNumberException = () => 'Le format n\'est pas bon';
const add = (x: number, y: number): Person => ({
    age: x, 
    name: null
});
const addTupled = tupled(add);

type SequenceNumber = (x: string) => (y: string) => Option<[number, number]>;
const sequenceNumber: SequenceNumber = (x) => (y) => sequenceTOption(
    toNumberSafe(x),
    toNumberSafe(y)
);



type f = (x: string) => (y: string) => Either<string, Person>;
const f: f = (x) => (y) => pipe(
    sequenceNumber(x)(y), // => Option<[number, number]>
    map(addTupled), // => ([x, y]: [number, number]): number => x + y;
    fromOption(formatStringToNumberException) // => to Either type
); // 😎🤯

console.log('f to Either<string, number> with facto');
console.log(f('ss')('4'));
console.log(f('4')('4'));