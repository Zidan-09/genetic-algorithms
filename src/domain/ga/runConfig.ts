import { Crossover } from "./methods/crossover/crossover";
import { Mutation } from "./methods/mutation/mutation";
import { Selection } from "./methods/selection/selection";

export type RunConfig = {
    popSize: number;
    generations: number;
    mutationRate: number;
    crossover: Crossover;
    mutation: Mutation;
    selection: Selection;
}