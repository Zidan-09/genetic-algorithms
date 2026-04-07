import type { Individual } from "../../individual/individual";
import { Crossover } from "./crossover";

export const uniformCrossover = new Crossover((p1: Individual, p2: Individual) => {
    const g1 = p1.getGenes();
    const g2 = p2.getGenes();

    const childGenes = g1.map((_, i) => {
        const a = g1[i];
        const b = g2[i];

        if (a === undefined || b === undefined) {
            throw new Error("Invalid genes");
        }

        return Math.random() < 0.5 ? a : b;
    });

    return childGenes;
});