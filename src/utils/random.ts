import { IO, of } from "fp-ts/lib/IO";

export type RandomFunc = (max: number) => number;

export const random: RandomFunc = (max) => (Math.floor(Math.random() * max) + 1);

export type RandomFuncSafe = (max: number) => IO<number>;

export const randomSafe: RandomFuncSafe = (max: number) => of(random(max));

export const bugRandom: RandomFunc = (max) => (Math.floor(Math.random() * max) + 1) + 10;

export const bugRandomSafe: RandomFuncSafe = (max) => of(bugRandom(max));