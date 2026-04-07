import { Mutation } from "./mutation";
import { Individual } from "../../individual/individual";

function gaussianRandom(): number {
    let u = 0, v = 0;

    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();

    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export const gaussianMutation = new Mutation((ind: Individual, rate: number, min?: number, max?: number) => {
    if (min === undefined || max === undefined) {
        throw new Error("Invalid min or max");
    }

    const genes = ind.getGenes();

    const sigma = 5;

    return genes.map(gene => {
        if (Math.random() < rate) {
            return Math.min(max, Math.max(min, gene + gaussianRandom() * sigma));
        }
        return gene;
    });
});