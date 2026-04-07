import { Selection } from "./selection";
import { Individual } from "../../individual/individual";

export const tournamentSelection: Selection = new Selection((population: Individual[]) => {
    if (population.length < 2) {
        throw new Error("Population must have at least 2 individuals");
    }

    const idx1 = Math.floor(Math.random() * population.length);

    let idx2 = Math.floor(Math.random() * population.length);

    while (idx1 === idx2) {
        idx2 = Math.floor(Math.random() * population.length);
    }

    const a = population[idx1];
    const b = population[idx2];

    if (!a || !b) {
        throw new Error("Invalid population state");
    }

    return a.getFitness() < b.getFitness() ? a : b;
});