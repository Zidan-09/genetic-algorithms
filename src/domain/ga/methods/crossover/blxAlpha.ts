import type { Individual } from "../../individual/individual";
import { Crossover } from "./crossover";

export const blxAlphaCrossover = new Crossover((p1: Individual, p2: Individual) => {
    const blxAlpha = 0.5;
    
    const g1 = p1.getGenes();
    const g2 = p2.getGenes();

    const childGenes = g1.map((_, i) => {
        const a = g1[i];
        const b = g2[i];

        if (a === undefined || b === undefined) {
            throw new Error("Invalid genes");
        }

        const min = Math.min(a, b);
        const max = Math.max(a, b);
        const range = max - min;

        const lower = min - blxAlpha * range;
        const upper = max + blxAlpha * range;

        return lower + Math.random() * (upper - lower);
    });

    return childGenes;
});