import type { Individual } from "./individual";

export class Mutation {
    private readonly calc: (ind: Individual, rate: number, min?: number, max?: number) => number[];

    constructor(calc: (ind: Individual, rate: number, min?: number, max?: number) => number[]) {
        this.calc = calc;
    }

    public mutate(ind: Individual, rate: number, min?: number, max?: number): number[] {
        return this.calc(ind, rate, min, max);
    }
}