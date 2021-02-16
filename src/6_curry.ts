/**
 * Ref :
 * https://javascript.info/currying-partials#currying-what-for
 */

import { curry, pipe } from 'ramda';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';






type Add = (a: number, b: number) => number;
export const add: Add = (a, b) => a + b;
const resultAdd = add(3, 3); // result: 6


export const addCurried = curry(add);
const resultCurriedAdd = add(3, 3); // result: 6



const add3 = addCurried(3);
const six = add3(3); // result: 6






export const multiply = (a: number, b: number): number => a * b;
export const multiplyCurried = curry(multiply); // 🤔

export const myAdd = (x: number) => (y: number) => x + y;
export const myMultiply = (x: number) => (y: number) => x * y; // 😎










export const add3AndMultiplyBy4 = (a: number) => multiply(add(3, a), 4); // (⊙_⊙;)
// VS
export const add3AndMultiplyBy4Curried = pipe(myAdd(3), myMultiply(4)); // ☜(ﾟヮﾟ☜)









const source = from([1, 2, 3, 4, 5]);

const example = source.pipe(map(val => val + 10));
// const subscribe = example.subscribe(val => console.log(val)); // 🥱

const example2 = source.pipe(map(myAdd(10)));
// const subscribe2 = example2.subscribe(console.log); // 🤗
