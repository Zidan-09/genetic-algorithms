import { Mutation } from "./mutation";
import { Individual } from "../../individual/individual";

export const globalMutation = new Mutation((ind: Individual, rate: number, min?: number, max?: number) => {
    const genes = ind.getGenes();

    if (min === undefined || max === undefined) throw new Error("This method requires min and max");

    return genes.map(gene => {
        if (Math.random() < rate) {
            return min + Math.random() * (max - min);
        }

        return gene;
    });
});