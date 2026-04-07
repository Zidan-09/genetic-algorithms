import type { Crossover } from "../entities/crossover";
import type { Mutation } from "../entities/mutation";
import type { Selection } from "../entities/selection";

type AgConfig = {
    genesSize: number;
    min: number;
    max: number;
    target: number;
}

type RunConfig = {
    popSize: number;
    generations: number;
    mutationRate: number;
    crossover: Crossover;
    mutation: Mutation;
    selection: Selection;
}

export type { AgConfig, RunConfig }