import { Mutation } from "./mutation";
import { Individual } from "../../individual/individual";

export const localMutation = new Mutation((ind: Individual, rate: number, _?: number, __?: number) => {
    const genes = ind.getGenes();

    return genes.map(gene => {
        if (Math.random() < rate) {
            const delta = Math.random() * 2 - 1;
            return gene + delta;
        }
        return gene;
    });
});