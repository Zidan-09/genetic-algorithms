import { Fitness } from "../entities/fitness";
import type { Individual } from "../entities/individual";
import { Selection } from "../entities/selection";
import type { AgConfig } from "./config";
import { Problems } from "./problems";
import { SelectionType } from "./selections";
import { CrossoverType } from "./crossovers";
import { MutationType } from "./mutations";
import { Crossover } from "../entities/crossover";
import { Mutation } from "../entities/mutation";

type General = {
    fitness: Fitness;
    config: AgConfig;
}

const cb3Fitness = new Fitness((genes: number[]) => {
    if (genes.length !== 2) {
        throw new Error("CB3 requires exactly 2 genes");
    }

    const [x, y] = genes;

    if (x == undefined || y == undefined) {
        throw new Error("Invalid genes");
    }

    return (
        2 * x ** 2 -
        1.05 * x ** 4 +
        (x ** 6) / 6 +
        x * y +
        y ** 2
    );
});

const ackFitness = new Fitness((genes: number[]) => {
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

const cb3Config: AgConfig = {
    genesSize: 2,
    min: -5,
    max: 5,
    target: 0.01
}

const ackConfig: AgConfig = {
    genesSize: 10,
    min: -32.768,
    max: 32.768,
    target: 0.01
}

const cb3General: General = {
    fitness: cb3Fitness,
    config: cb3Config
}

const ackGeneral: General = {
    fitness: ackFitness,
    config: ackConfig
}

const problemsMap: Record<Problems, General> = {
    [Problems.CB3]: cb3General,
    [Problems.ACK]: ackGeneral
};

const tournament: Selection = new Selection((population: Individual[]) => {
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

const roulette: Selection = new Selection((population: Individual[]) => {
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

const ranking: Selection = new Selection((population: Individual[]) => {
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

const selectionMap: Record<SelectionType, Selection> = {
    [SelectionType.TOURNAMENT]: tournament,
    [SelectionType.ROULETTE]: roulette,
    [SelectionType.RANKING]: ranking
}

const uniformCrossover = new Crossover((p1, p2) => {
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

const averageCrossover = new Crossover((p1, p2) => {
    const g1 = p1.getGenes();
    const g2 = p2.getGenes();

    const childGenes = g1.map((_, i) => {
        const a = g1[i];
        const b = g2[i];

        if (a === undefined || b === undefined) {
            throw new Error("Invalid genes");
        }

        return (a + b) / 2;
    });

    return childGenes;
});

const blxAlpha = 0.5;

const blxAlphaCrossover = new Crossover((p1, p2) => {
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

const crossoverMap: Record<CrossoverType, Crossover> = {
    [CrossoverType.UNIFORM]: uniformCrossover,
    [CrossoverType.AVERAGE]: averageCrossover,
    [CrossoverType.BLX_ALPHA]: blxAlphaCrossover
};

const globalMutation = new Mutation((ind: Individual, rate: number, min?: number, max?: number) => {
    const genes = ind.getGenes();

    if (min === undefined || max === undefined) throw new Error("This method requires min and max");

    return genes.map(gene => {
        if (Math.random() < rate) {
            return min + Math.random() * (max - min);
        }

        return gene;
    });
});

const localMutation = new Mutation((ind: Individual, rate: number, _?: number, __?: number) => {
    const genes = ind.getGenes();

    return genes.map(gene => {
        if (Math.random() < rate) {
            const delta = Math.random() * 2 - 1;
            return gene + delta;
        }
        return gene;
    });
});

function gaussianRandom(): number {
    let u = 0, v = 0;

    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();

    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const gaussianMutation = new Mutation((ind: Individual, rate: number, _?: number, __?: number) => {
    const genes = ind.getGenes();

    const sigma = 1;

    return genes.map(gene => {
        if (Math.random() < rate) {
            return gene + gaussianRandom() * sigma;
        }
        return gene;
    });
});

const mutationMap: Record<MutationType, Mutation> = {
    [MutationType.GLOBAL]: globalMutation,
    [MutationType.LOCAL]: localMutation,
    [MutationType.GAUSSIAN]: gaussianMutation
};

export { problemsMap, selectionMap, crossoverMap, mutationMap }