import { Selection } from "./selection";
import { Individual } from "../../individual/individual";

export const rankingSelection: Selection = new Selection((population: Individual[]) => {
    const sorted = [...population].sort(
        (a, b) => a.getFitness() - b.getFitness()
    );

    const n = sorted.length;

    const weights = sorted.map((_, i) => (n - i));

    const total = weights.reduce((sum, w) => sum + w, 0);

    let r = Math.random() * total;

    for (let i = 0; i < n; i++) {
        const w = weights[i];
        const ind = sorted[i];

        if (w === undefined || ind === undefined) {
            throw new Error("Invalid selection state");
        }

        r -= w;

        if (r <= 0) {
            return ind;
        }
    }

    const last = sorted[n - 1];

    if (!last) {
        throw new Error("Invalid Individual");
    }

    return last;
});