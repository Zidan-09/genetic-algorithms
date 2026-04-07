import type { Individual } from "./individual";

export class Crossover {
    private readonly func: (p1: Individual, p2: Individual) => number[];

    constructor(func: (p1: Individual, p2: Individual) => number[]) {
        this.func = func;
    }

    public cross(p1: Individual, p2: Individual): number[] {
        return this.func(p1, p2);
    }
}