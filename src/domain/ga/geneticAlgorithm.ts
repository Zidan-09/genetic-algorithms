import { Fitness } from "./fitness/fitness";
import { Individual } from "./individual/individual";
import { Counter } from "../counter/counter";
import type { AgConfig } from "./agConfig";
import type { RunConfig } from "./runConfig";
import { Selection } from "./methods/selection/selection";
import { Crossover } from "./methods/crossover/crossover";
import { Mutation } from "./methods/mutation/mutation";

class GeneticAlgorithm {
    private readonly POP_SIZE: number;
    private readonly GENERATIONS: number;
    private readonly MUTATION_RATE: number;
    private readonly GENES_SIZE: number;
    private readonly TARGET: number;
    private readonly MIN: number;
    private readonly MAX: number;

    private readonly fitness: Fitness;

    private readonly counter: Counter;

    private readonly selectionMethod: Selection;
    private readonly crossMethod: Crossover;
    private readonly mutateMethod: Mutation;

    constructor(
        runConfig: RunConfig,
        agConfig: AgConfig,
        fitness: Fitness,
        counter: Counter,
    ) {
        this.POP_SIZE = runConfig.popSize;
        this.GENERATIONS = runConfig.generations;
        this.MUTATION_RATE = runConfig.mutationRate;
        this.GENES_SIZE = agConfig.genesSize;
        this.MIN = agConfig.min;
        this.MAX = agConfig.max;
        this.TARGET = agConfig.target;
        this.fitness = fitness;
        this.counter = counter;
        this.selectionMethod = runConfig.selection;
        this.crossMethod = runConfig.crossover;
        this.mutateMethod = runConfig.mutation;
    }

    public execute(log: boolean): Individual {
        let population = this.createPopulation();

        for (let gen = 0; gen < this.GENERATIONS; gen++) {

            const sorted = [...population].sort(
                (a, b) => a.getFitness() - b.getFitness()
            );

            const eliteCount = 1;
            const newPopulation = sorted.slice(0, eliteCount);

            for (let i = eliteCount; i < this.POP_SIZE; i++) {
                const p1 = this.selectionMethod.select(population);
                const p2 = this.selectionMethod.select(population);

                let child = this.crossover(p1, p2);
                const mutationResult = this.mutateMethod.mutate(child, this.MUTATION_RATE, this.MIN, this.MAX);

                const newIndividual = new Individual(mutationResult, this.evaluate(mutationResult));

                newPopulation.push(newIndividual);
            }

            population = newPopulation;

            const best = population[0];

            if (!best) throw new Error("Invalid Individual");

            if (best.getFitness() <= this.TARGET) {
                break;
            }

            if (log) console.log(
                `Geração ${gen} | f: ${best.getFitness().toFixed(6)} | g: ${best.getGenes().join(", ")}`
            );
        }

        return population.reduce((a, b) =>
            a.getFitness() < b.getFitness() ? a : b
        );
    }

    public getCounter(): Counter {
        return this.counter;
    }

    private randomGene(): number {
        return this.MIN + Math.random() * (this.MAX - this.MIN);
    }

    private createIndividual(): Individual {
        const genes: number[] = [];
        
        for (let i = 0; i < this.GENES_SIZE; i++) {
            genes.push(this.randomGene());
        }

        return new Individual(genes, this.evaluate(genes));
    }

    private createPopulation(): Individual[] {
        return Array.from({ length: this.POP_SIZE }, () =>
            this.createIndividual()
        );
    }

    private crossover(p1: Individual, p2: Individual): Individual {
        const childGenes = this.crossMethod.cross(p1, p2);

        return new Individual(childGenes, this.evaluate(childGenes));
    }

    private evaluate(genes: number[]): number {
        this.counter.addNfe();
        return this.fitness.evaluate(genes);
    }
}

export { GeneticAlgorithm }