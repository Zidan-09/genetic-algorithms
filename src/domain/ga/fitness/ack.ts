import { Fitness } from "./fitness";

export const ackFitness = new Fitness((genes: number[]) => {
    const n = genes.length;

    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < n; i++) {
        const x = genes[i];

        if (x == undefined) {
            throw new Error("Invalid gene");
        }

        sum1 += x * x;
        sum2 += Math.cos(2 * Math.PI * x);
    }

    const term1 = -20 * Math.exp(-0.2 * Math.sqrt(sum1 / n));
    const term2 = -Math.exp(sum2 / n);

    return term1 + term2 + 20 + Math.E;
});