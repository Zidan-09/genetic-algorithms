import { Selection } from "./selection";
import { Individual } from "../../individual/individual";

export const rouletteSelection: Selection = new Selection((population: Individual[]) => {
    const epsilon = 1e-6;

    let total = 0;
    const weights = population.map(ind => {
        const f = ind.getFitness();
        const w = 1 / (f + epsilon);
        total += w;
        return w;
    });

    let r = Math.random() * total;

    for (let i = 0; i < population.length; i++) {
        const w = weights[i];
        const ind = population[i];

        if (w === undefined || ind === undefined) {
            throw new Error("Invalid selection state");
        }

        r -= w;

        if (r <= 0) {
            return ind;
        }
    }

    const last = population[population.length - 1];

    if (!last) {
        throw new Error("Invalid Individual");
    }

    return last;
});