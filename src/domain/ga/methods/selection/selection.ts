import type { Individual } from "../../individual/individual";

export class Selection {
    private readonly func: (population: Individual[]) => Individual;

    constructor(func: (population: Individual[]) => Individual) {
        this.func = func;
    }

    public select(population: Individual[]) {
        return this.func(population);
    }
}